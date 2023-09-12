import { Proxyable } from '@/components';

export type OutputParams<T> = {
  type: string;
  value?: T;
};

export type OutputSocket<T> = OutputParams<T>;

export default class Output<T = unknown> extends Proxyable<OutputSocket<T>> {
  constructor(params: OutputParams<T>) {
    const { type, value } = params;

    super({ type, value });
  }
}
