// This is needed for proxies, which require parameter reassignments
/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';

export type NestedRecord<T> = {
  [K in keyof T]: T[K] extends object ? NestedRecord<T[K]> | T[K] : T[K];
};

export type ObservablePathValue<
  T,
  P extends string,
> = P extends `${infer F}.${infer R}`
  ? F extends keyof T
    ? ObservablePathValue<T[F], R>
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type ObservablePathKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object | undefined
          ?
              | `${K}`
              | (`${K}.${ObservablePathKeys<
                  NonNullable<T[K]>
                >}` extends `${string}.`
                  ? never
                  : `${K}.${ObservablePathKeys<NonNullable<T[K]>>}`)
          : `${K}`
        : never;
    }[keyof T]
  : '';

export type Listener<T> = (current: T, previous: T) => void;

export default class Observable<T extends NestedRecord<unknown>> {
  public value: T;
  public prevValue: T | undefined = undefined;

  private globalListeners: Listener<T>[] = [];
  private listeners: Map<
    string,
    Array<(value: unknown, prevValue: unknown) => void>
  > = new Map();

  constructor(initialState: T) {
    this.value = this.deepProxy(initialState);
  }

  protected deepProxy(
    obj: T,
    path: ObservablePathKeys<T> = '' as ObservablePathKeys<T>,
  ): T {
    return new Proxy(obj, {
      get: (target: T, prop: string | symbol): unknown => {
        if (typeof prop !== 'string') {
          return target[prop as keyof T];
        }

        const value = target[prop as keyof T];
        const newPath = path
          ? (`${path}.${prop}` as ObservablePathKeys<T>)
          : prop;
        if (typeof value === 'object' && !isNil(value)) {
          return this.deepProxy(value as T, newPath as ObservablePathKeys<T>);
        }
        return value;
      },
      set: (target: T, prop: string | symbol, value: unknown): boolean => {
        if (typeof prop !== 'string') {
          target[prop as keyof T] = value as T[keyof T];
          return true;
        }

        this.prevValue = cloneDeep(this.value);
        const affectedPaths = this.computeAffectedPaths(
          path ? `${path}.${prop}` : prop,
        );
        target[prop as keyof T] = value as T[keyof T];
        this.notifyListeners(affectedPaths);
        return true;
      },
    });
  }

  protected computeAffectedPaths(fullPath: string): string[] {
    return fullPath
      .split('.')
      .map((_, i, arr) => arr.slice(0, i + 1).join('.'));
  }

  public subscribe(listener: (current: T, previous: T) => void): () => void {
    this.globalListeners.push(listener);
    return () => {
      const index = this.globalListeners.indexOf(listener);
      if (index >= 0) {
        this.globalListeners.splice(index, 1);
      }
    };
  }

  public subscribeToPath<P extends ObservablePathKeys<T>>(
    path: P,
    listener: (
      value: ObservablePathValue<T, P>,
      prevValue: ObservablePathValue<T, P>,
    ) => void,
  ): () => void {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, []);
    }

    this.listeners
      .get(path)
      ?.push(
        listener as unknown as (value: unknown, prevValue: unknown) => void,
      );

    return () => {
      const pathListeners = this.listeners.get(path);
      const index =
        pathListeners?.indexOf(
          listener as unknown as (value: unknown, prevValue: unknown) => void,
        ) ?? -1;
      if (index >= 0) pathListeners?.splice(index, 1);
    };
  }

  protected notifyListeners(affectedPaths: string[]): void {
    this.globalListeners.forEach((listener) =>
      listener(this.value, this.prevValue as T),
    );
    affectedPaths.forEach((path) => {
      const pathListeners = this.listeners.get(path);
      if (pathListeners) {
        const currentValue = this.getValueAtPath(
          this.value,
          path as ObservablePathKeys<T>,
        );
        const previousValue = this.getValueAtPath(
          this.prevValue,
          path as ObservablePathKeys<T>,
        );

        pathListeners.forEach((listener) =>
          listener(currentValue, previousValue),
        );
      }
    });
  }

  private getValueAtPath<P extends ObservablePathKeys<T>>(
    obj: T | undefined,
    path: P,
  ): ObservablePathValue<T, P> {
    return path
      .split('.')
      .reduce((acc: NestedRecord<unknown> | undefined, part: string) => {
        if (typeof acc === 'object' && !isNil(acc) && part in acc) {
          return acc[part as keyof typeof acc];
        }
        return undefined;
      }, obj) as ObservablePathValue<T, P>;
  }
}
