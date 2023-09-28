import isNil from 'lodash/isNil';
import { Observable } from '@/components';
import { NodesOutputsTree } from '@/components/NodesOutputsTreeBuilder';

export type SerialzedInputConnection = {
  nodeId: string;
  outputId: string;
};

export type SerializedInput = {
  connection?: SerialzedInputConnection;
};

export type InputConnection = SerialzedInputConnection;

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

      const value = tree?.[connectedNodeId]?.outputs?.[connectedOutputId] as T;

      if (isNil(value)) return;

      this.value.value = value;
    });
  }

  public destroy = () => {
    if (this.unsubscribe) this.unsubscribe();
  };
}
