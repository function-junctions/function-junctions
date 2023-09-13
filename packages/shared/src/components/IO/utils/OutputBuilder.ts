import { Builder } from '@/components';

/** The type of the required fields for an output socket. */
export type OutputSocketRequired = {
  type: string;
};

/** The type of an output socket. */
export type OutputSocket<T> = OutputSocketRequired & {
  value?: T;
};

/** The type of a serialized output socket. */
export type SerializedOutputSocket = OutputSocketRequired;

/** The type of the parameters for creating an output socket. */
export type OutputSocketParams = OutputSocketRequired;

/**
 * @class
 * @extends Builder<OutputSocket<T>>
 * A builder class that creates proxies for output sockets.
 */
export default class OutputBuilder<T = unknown> extends Builder<
  OutputSocket<T>
> {
  constructor(params: OutputSocket<T>) {
    const { type, value } = params;

    super({ type, value });
  }
}
