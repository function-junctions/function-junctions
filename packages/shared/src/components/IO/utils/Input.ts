import { StatefulTree } from '@/components/Tree';
import { InputBuilder, InputConnection, InputSocketParams } from '.';
import { Builder } from '@/components';

const updateConnection = (connection: InputConnection) => {};

export default class Input<T = unknown> {
  constructor(params: InputSocketParams, tree: StatefulTree) {
    const value: T | undefined = undefined;

    const { type } = params;

    const builder = new InputBuilder({
      type,
      value,
    });

    const input = builder.create();

    const connection: InputConnection = new Builder(
      params.connection ?? { nodeId: '', outputId: '' },
    ).create();
  }
}
