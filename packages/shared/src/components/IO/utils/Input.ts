import { StatefulTree } from '@/components/Tree';
import { InputBuilder, InputSocketParams } from '.';

export default class Input<T = unknown> {
  constructor(params: InputSocketParams, tree: StatefulTree) {
    const value: T | undefined = undefined;

    const { type, connection: defaultConnection } = params;

    const input = new InputBuilder({
      type,
      value,
      connection: defaultConnection,
    });

    input.subscribeToPath('connection', ({ connection }) => {
      if (!connection) return;

      const { nodeId, outputId } = connection;
      const output = tree.nodes[nodeId].outputs[outputId];

      input.value.value = output.value as typeof value;
    });
  }
}
