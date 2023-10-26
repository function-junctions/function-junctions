import isNil from 'lodash/isNil';
import { Observable } from '@/modules';
import { NodesOutputsTree } from '@/modules/NodesOutputsTreeBuilder';

export type InitialInputConnection = {
  nodeId: string;
  outputId: string;
};

export type InitialInput = {
  connection?: InitialInputConnection;
};

export type InputConnection = InitialInputConnection;

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
