import { Observable } from '@/components';
import { InputSocket, SerializedInputSocket } from '@/components/Input';
import { NodeOutputsTreeBuilder } from '@/components/NodeOutputsTreeBuilder';
import { deserializeInputTree } from '..';

export type SerializedNodeInputsTree = {
  inputs: Record<string, SerializedInputSocket>;
};
export type SerializedNodesInputsTree = Record<
  string,
  SerializedNodeInputsTree
>;

export type NodeInputsTree = {
  inputs: Record<string, Observable<InputSocket<unknown>>>;
};
export type NodesInputsTree = Record<string, NodeInputsTree>;

export default class NodeInputsTreeBuilder<
  T extends SerializedNodesInputsTree = SerializedNodesInputsTree,
> extends Observable<NodesInputsTree> {
  constructor(tree: T, outputTreeBuilder: NodeOutputsTreeBuilder) {
    super(deserializeInputTree(tree, outputTreeBuilder));
  }
}
