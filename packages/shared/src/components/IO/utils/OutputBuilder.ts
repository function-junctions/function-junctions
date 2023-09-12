import { Builder } from '@/components';

export type OutputParams<T> = {
  type: string;
  value?: T;
};

export type OutputSocket<T> = OutputParams<T>;

export type SerializedOutputSocket = { type: string };

export default class OutputBuilder<T = unknown> extends Builder<
  OutputSocket<T>
> {
  constructor(params: OutputParams<T>) {
    const { type, value } = params;

    super({ type, value });
  }
}
