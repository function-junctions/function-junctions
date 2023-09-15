import { StatefulTree } from '@/components/Tree';
import {
  InputBuilder,
  InputConnection,
  InputSocket,
  InputSocketParams,
} from '.';

export default class Input<T = unknown> {
  public value: InputSocket<T>;

  constructor(params: InputSocketParams, tree: StatefulTree) {
    const { type, connection: defaultConnection } = params;

    const value: T | undefined = undefined;

    const input = new InputBuilder({
      type,
      value,
      connection: defaultConnection,
    });

    input.subscribeToPath<InputConnection>('connection', (connection) => {
      if (!connection) return;

      const { nodeId, outputId } = connection;
      const output = tree.nodes?.[nodeId]?.outputs?.[outputId];

      if (!output) return;

      input.value.value = output.value as typeof value;
    });

    this.value = input.value;
  }
}
