import { Builder } from '@/components';

/**
 * The type of a connection for an input socket.
 */
export type InputConnection = {
  outputId: string;
  nodeId: string;
};

/** The type of options for input socket. */
export type InputSocketOptions = {
  connection?: InputConnection;
};

/** The type of the required fields for an input socket. */
export type InputSocketRequired = {
  type: string;
};

/** The type of an input socket. */
export type InputSocket<T> = InputSocketRequired &
  InputSocketOptions & {
    value?: T;
  };

/** The type of a serialized input socket. */
export type SerializedInputSocket = InputSocketRequired & InputSocketOptions;

/**
 * The type of the parameters for creating an input socket.
 * Input socket options are optional when creating an input socket.
 */
export type InputSocketParams = InputSocketRequired &
  Partial<InputSocketOptions>;

/**
 * A builder class that creates proxies for input sockets.
 * @class
 * @extends Builder<InputSocket<T>>
 */
export default class InputBuilder<T = unknown> extends Builder<InputSocket<T>> {
  constructor(params: InputSocket<T>) {
    const { connection, type, value } = params;

    super({ type, connection, value });
  }
}
