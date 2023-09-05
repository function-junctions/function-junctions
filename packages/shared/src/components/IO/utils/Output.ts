import {
  PropertyChangeEvent,
  PropertyReadEvent,
  Proxyable,
} from '@/components';

export type OutputParams<T> = {
  type: string;
  value?: T;
};

export type OutputSocket<T> = OutputParams<T>;

export default class Output<T = unknown> {
  public type: string;
  public value?: T;

  public onRead: (
    key: keyof OutputSocket<T>,
    event: PropertyReadEvent<OutputSocket<T>[keyof OutputSocket<T>]>,
  ) => void;
  public onChange: (
    key: keyof OutputSocket<T>,
    event: PropertyChangeEvent<OutputSocket<T>[keyof OutputSocket<T>]>,
  ) => void;

  constructor(params: OutputParams<T>) {
    const { type, value } = params;

    const proxy = new Proxyable({ type, value });
    const output = proxy.create();

    this.type = output.type;
    this.value = output.value;

    this.onRead = proxy.onPropertyRead;
    this.onChange = proxy.onPropertyChange;
  }
}
