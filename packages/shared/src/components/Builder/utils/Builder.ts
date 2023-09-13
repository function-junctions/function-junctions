import { isNil, set } from 'lodash';

export type PropertyChangeEvent<T> = (oldValue: T, newValue: T) => void;
export type PropertyReadEvent<T> = (value: T) => T;

/**
 * A builder class that creates proxies for objects.
 * This class can be extended to create builders for specific types to proxy.
 * @class
 */
export default class Builder<T extends Record<string, unknown>> {
  private readonly proxyObj: T;
  private readonly changeEvents: Map<string, PropertyChangeEvent<T[keyof T]>> =
    new Map();
  private readonly readEvents: Map<string, PropertyReadEvent<T[keyof T]>> =
    new Map();

  constructor(obj: T) {
    this.proxyObj = obj;
  }

  /**
   * Sets a property change event for a given key on the object.
   * @param key The key to set the event for.
   * @param event The event to trigger when the property is changed.
   */
  public onPropertyChange = <TKey extends Extract<keyof T, string>>(
    key: TKey,
    event: PropertyChangeEvent<T[TKey]>,
  ): Builder<T> => {
    this.changeEvents.set(key, event as PropertyChangeEvent<T[keyof T]>);
    return this;
  };

  /**
   * Sets a property read event for a given key on the object.
   * @param key The key to set the event for.
   * @param event The event to trigger when the property is read.
   */
  public onPropertyRead = <TKey extends Extract<keyof T, string>>(
    key: TKey,
    event: PropertyReadEvent<T[TKey]>,
  ): Builder<T> => {
    this.readEvents.set(key, event as unknown as PropertyReadEvent<T[keyof T]>);
    return this;
  };

  /**
   * Creates a proxy for the object with the registered events.
   * @returns The proxied object.
   */
  public create = (): T =>
    new Proxy(this.proxyObj, {
      set: (obj, key: Extract<keyof T, string>, newValue: T[keyof T]) =>
        this.proxySet(obj, key, newValue),
      get: (obj, key: Extract<keyof T, string>) => this.proxyGet(obj, key),
    });

  /**
   * The proxy set handler.
   * Sets the value of the property on the object and triggers the change event if it exists.
   */
  private proxySet = (
    obj: T,
    key: Extract<keyof T, string>,
    newValue: T[keyof T],
  ): boolean => {
    if (!(key in obj)) return false;

    const oldValue = obj[key];
    set(obj, key, newValue);

    const event = this.changeEvents.get(key);
    if (!isNil(event)) event(oldValue, newValue);

    return true;
  };

  /**
   * The proxy get handler.
   * If a read event exists for the property, it will be called and the result returned.
   * Otherwise, the value of the property will be returned.
   */
  private proxyGet = (obj: T, key: keyof T): T[keyof T] | undefined => {
    if (!(key in obj)) return undefined;

    const event = this.readEvents.get(key.toString());
    if (!isNil(event)) return event(obj[key]);

    return obj[key];
  };
}
