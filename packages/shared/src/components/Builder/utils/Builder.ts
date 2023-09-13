import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';

type NestedRecord<T> = {
  [key: string]: T extends object ? NestedRecord<T[keyof T]> | T : T;
};

export default class Builder<T extends NestedRecord<unknown>> {
  public value: T;
  public prevValue: T | undefined = undefined;

  private globalListeners: Array<(current: T, previous: T) => void> = [];
  private listeners: Map<string, Array<(value: T, prevValue: T) => void>> =
    new Map();

  constructor(initialState: T) {
    this.value = this.deepProxy(initialState);
  }

  private deepProxy(obj: T, path = ''): T {
    return new Proxy(obj, {
      get: (target: T, prop: string) => {
        const value = target[prop] as T;
        const newPath = path ? `${path}.${prop}` : prop;
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

  public subscribeToPath(
    path: string,
    listener: (value: T, prevValue: T) => void,
  ): () => void {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, []);
    }

    this.listeners.get(path)?.push(listener);

    return () => {
      const pathListeners = this.listeners.get(path);
      const index = pathListeners?.indexOf(listener) ?? -1;
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
        const previousValue = this.getValueAtPath(this.prevValue as T, path);

        pathListeners.forEach((listener) =>
          listener(currentValue, previousValue),
        );
      }
    });
  }

  private getValueAtPath(obj: T, path: string): T {
    return path
      .split('.')
      .reduce(
        (acc: unknown, part: string) => (acc && (acc as T)[part]) || undefined,
        obj,
      ) as T;
  }
}
