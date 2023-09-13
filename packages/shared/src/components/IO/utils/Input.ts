import { StatefulTree } from '@/components/Tree';
import { InputBuilder, InputSocketParams } from '.';

export default class Input<T = unknown> {
  constructor(params: InputSocketParams, tree: StatefulTree) {
    const { type, connection: defaultConnection } = params;

    const value: T | undefined = defaultConnection
      ? (tree.nodes?.[defaultConnection.nodeId]?.outputs?.[
          defaultConnection.outputId
        ].value as T)
      : undefined;

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
