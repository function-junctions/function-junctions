export type SerialzedInputSocketConnection = {
  nodeId: string;
  outputId: string;
};

export type SerializedInputSocket = {
  connection?: SerialzedInputSocketConnection;
};

export type InputSocketConnection = SerialzedInputSocketConnection;

export type InputSocket<T> = {
  connection?: InputSocketConnection;
  value: T;
};
