import { isNil, set } from 'lodash';

type PropertyChangeEvent<T> = (oldValue: T, newValue: T) => void;
type PropertyReadEvent<T> = (value: T) => T;

/**
 * @class
 * A class that creates proxies for objects.
 */
export default class Proxyable<T extends Record<string, unknown>> {
  private readonly ProxyObj: T;
  private readonly ChangeEvents: Map<string, PropertyChangeEvent<T[keyof T]>> =
    new Map();
  private readonly ReadEvents: Map<string, PropertyReadEvent<T[keyof T]>> =
    new Map();

  constructor(obj: T) {
    this.ProxyObj = obj;
  }

  /**
   * Sets a property change event for a given key on the object.
   * @param key The key to set the event for.
   * @param event The event to trigger when the property is changed.
   */
  public onPropertyChange<TKey extends keyof T>(
    key: TKey,
    event: PropertyChangeEvent<T[TKey]>,
  ): Proxyable<T> {
    this.ChangeEvents.set(
      key.toString(),
      event as PropertyChangeEvent<T[keyof T]>,
    );
    return this;
  }

  /**
   * Sets a property read event for a given key on the object.
   * @param key The key to set the event for.
   * @param event The event to trigger when the property is read.
   */
  public onPropertyRead<TKey extends keyof T>(
    key: TKey,
    event: PropertyReadEvent<T[TKey]>,
  ): Proxyable<T> {
    this.ReadEvents.set(
      key.toString(),
      event as unknown as PropertyReadEvent<T[keyof T]>,
    );
    return this;
  }

  /**
   * Creates a proxy for the object with the registered events.
   * @returns The proxied object.
   */
  public create(): T {
    return new Proxy(this.ProxyObj, {
      set: (obj, key, newValue) =>
        this.proxySet(obj, key as keyof T, newValue as T[keyof T]),
      get: (obj, key) => this.proxyGet(obj, key as keyof T),
    });
  }

  /**
   * The proxy set handler.
   * Sets the value of the property on the object and triggers the change event if it exists.
   */
  private proxySet(obj: T, key: keyof T, newValue: T[keyof T]): boolean {
    if (!(key in obj)) return false;

    const oldValue = obj[key];
    set(obj, key, newValue);

    const event = this.ChangeEvents.get(key.toString());
    if (!isNil(event)) event(oldValue, newValue);

    return true;
  }

  /**
   * The proxy get handler.
   * If a read event exists for the property, it will be called and the result returned.
   * Otherwise, the value of the property will be returned.
   */
  private proxyGet(obj: T, key: keyof T): unknown {
    if (!(key in obj)) return undefined;

    const event = this.ReadEvents.get(key.toString());
    if (!isNil(event)) return event(obj[key]);

    return obj[key];
  }
}
