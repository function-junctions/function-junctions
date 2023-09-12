import { Proxyable } from '@/components';

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

export default class Input<T = unknown> extends Proxyable<InputSocket<T>> {
  constructor(params: InputParams) {
    const { connection, type } = params;
    const value: T | undefined = undefined;

    super({ type, connection, value });
  }
}
