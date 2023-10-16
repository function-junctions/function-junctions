import isNil from 'lodash/isNil';
import { Observable } from '@/components';
import { NodesOutputsTree } from '@/components/NodesOutputsTreeBuilder';

export type SerializedInputConnection = {
  nodeId: string;
  outputId: string;
};

export type SerializedInput = {
  connection?: SerializedInputConnection;
};

export type InputConnection = SerializedInputConnection;

export type Input<T> = {
  connection?: InputConnection;
  value: T;
};

export default class InputBuilder<T = unknown> extends Observable<Input<T>> {
  private unsubscribe?: () => void;
  constructor(input: Input<T>, tree: NodesOutputsTree) {
    super(input);

    this.unsubscribe = this.subscribeToPath('connection', (inputConnection) => {
      if (!inputConnection) return;

      const { nodeId: connectedNodeId, outputId: connectedOutputId } =
        inputConnection;

      const value =
        tree?.nodes?.[connectedNodeId]?.outputs?.[connectedOutputId].value;

      if (isNil(value)) return;

      this.value.value = value as T;
    });
  }

  public destroy = () => {
    if (this.unsubscribe) this.unsubscribe();
  };
}
