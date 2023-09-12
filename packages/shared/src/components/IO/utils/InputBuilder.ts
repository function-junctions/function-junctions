import { Builder } from '@/components';

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

export type SerializedInputSocket = InputParams;

export default class InputBuilder<T = unknown> extends Builder<InputSocket<T>> {
  constructor(params: InputParams) {
    const { connection, type } = params;
    const value: T | undefined = undefined;

    super({ type, connection, value });
  }
}
