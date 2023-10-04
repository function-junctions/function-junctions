import { Observable } from '@/components';
import { Input, SerializedInput } from '@/components/InputBuilder';
import {
  NodesOutputsTreeBuilder,
  SerializedNodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';
import {
  deserializeInputTree,
  serializeInputTree,
} from '@/components/NodesInputsTreeBuilder';

export type SerializedNodeInputsTree = {
  inputs: Record<string, SerializedInput>;
};
export type SerializedNodesInputsTree = {
  nodes: Record<string, SerializedNodeInputsTree>;
};

export type NodeInputsTree = {
  inputs: Record<string, Observable<Input<unknown>>>;
};
export type NodesInputsTree = {
  nodes: Record<string, NodeInputsTree>;
};

export default class NodesInputsTreeBuilder<
  T extends SerializedNodesInputsTree = SerializedNodesInputsTree,
  TOutput extends SerializedNodesOutputsTree = SerializedNodesOutputsTree,
> extends Observable<NodesInputsTree> {
  constructor(tree: T, outputTreeBuilder: NodesOutputsTreeBuilder<TOutput>) {
    super(deserializeInputTree<T, TOutput>(tree, outputTreeBuilder));
  }

  public serialize = () => serializeInputTree(this.value);
}
