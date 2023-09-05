import {
  PropertyChangeEvent,
  PropertyReadEvent,
  Proxyable,
} from '@/components';

export type InputConnection = {
  outputId: string;
  nodeId: string;
};

export type InputParams = {
  type: string;
  connection?: InputConnection;
};

export type InputSocket<T> = InputParams & {
  value?: T;
};

export default class Input<T = unknown> {
  public type: string;
  public connection?: InputConnection;
  public value?: T;

  public onRead: (
    key: keyof InputSocket<T>,
    event: PropertyReadEvent<InputSocket<T>[keyof InputSocket<T>]>,
  ) => void;
  public onChange: (
    key: keyof InputSocket<T>,
    event: PropertyChangeEvent<InputSocket<T>[keyof InputSocket<T>]>,
  ) => void;

  constructor(params: InputParams) {
    const { connection, type } = params;

    const value: T | undefined = undefined;

    const proxy = new Proxyable({ type, connection, value });
    const input = proxy.create();

    this.type = input.type;
    this.connection = input.connection;
    this.value = value;

    this.onRead = proxy.onPropertyRead;
    this.onChange = proxy.onPropertyChange;
  }
}
