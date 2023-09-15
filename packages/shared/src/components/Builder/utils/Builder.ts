import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';

type NestedRecord<T> = {
  [key: string]: T extends object ? NestedRecord<T[keyof T]> | T : T;
};

export default class Builder<T extends NestedRecord<unknown>> {
  public value: T;
  public prevValue: T | undefined = undefined;

  private globalListeners: Array<(current: T, previous: T) => void> = [];
  private listeners: Map<
    string,
    Array<(value: T[keyof T], prevValue: T[keyof T]) => void>
  > = new Map();

  constructor(initialState: T) {
    this.value = this.deepProxy(initialState);
  }

  private deepProxy(obj: T, path = ''): T {
    return new Proxy(obj, {
      get: (target: T, prop: symbol) => {
        const key = prop.toString();
        const value = target[key] as T;
        const newPath = path ? `${path}.${key}` : key;
        if (typeof value === 'object' && !isNil(value)) {
          return this.deepProxy(value, newPath);
        }
        return value;
      },
      set: (target: T, prop: string, value: T[keyof T]) => {
        this.prevValue = cloneDeep(this.value);
        const affectedPaths = this.computeAffectedPaths(
          path ? `${path}.${prop}` : prop,
        );
        // eslint-disable-next-line no-param-reassign
        (target as Record<string, unknown>)[prop] = value;
        this.notifyListeners(affectedPaths);
        return true;
      },
    });
  }

  private computeAffectedPaths(fullPath: string): string[] {
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

  public subscribeToPath<K>(
    path: string,
    listener: (value: K, prevValue: K) => void,
  ): () => void {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, []);
    }

    this.listeners
      .get(path)
      ?.push(listener as (value: T[keyof T], prevValue: T[keyof T]) => void);

    return () => {
      const pathListeners = this.listeners.get(path);
      const index =
        pathListeners?.indexOf(
          listener as (value: T[keyof T], prevValue: T[keyof T]) => void,
        ) ?? -1;
      if (index >= 0) {
        pathListeners!.splice(index, 1);
      }
    };
  }

  private notifyListeners(affectedPaths: string[]): void {
    this.globalListeners.forEach((listener) =>
      listener(this.value, this.prevValue as T),
    );
    affectedPaths.forEach((path) => {
      const pathListeners = this.listeners.get(path);
      if (pathListeners) {
        const currentValue = this.getValueAtPath(this.value, path);
        const previousValue = this.getValueAtPath(this.prevValue, path);

        pathListeners.forEach((listener) =>
          listener(currentValue, previousValue),
        );
      }
    });
  }

  private getValueAtPath(obj: T | undefined, path: string) {
    return path
      .split('.')
      .reduce(
        (acc, part) => (acc && (acc[part] as T)) ?? undefined,
        obj,
      ) as T[keyof T];
  }
}
