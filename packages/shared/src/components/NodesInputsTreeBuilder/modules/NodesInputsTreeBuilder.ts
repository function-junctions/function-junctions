import { Observable } from '@/components';
import { Input, SerializedInput } from '@/components/InputBuilder';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import { deserializeInputTree } from '..';

export type SerializedNodeInputsTree = {
  inputs: Record<string, SerializedInput>;
};
export type SerializedNodesInputsTree = Record<
  string,
  SerializedNodeInputsTree
>;

export type NodeInputsTree = {
  inputs: Record<string, Observable<Input<unknown>>>;
};
export type NodesInputsTree = Record<string, NodeInputsTree>;

export default class NodesInputsTreeBuilder<
  T extends SerializedNodesInputsTree = SerializedNodesInputsTree,
> extends Observable<NodesInputsTree> {
  constructor(tree: T, outputTreeBuilder: NodesOutputsTreeBuilder) {
    super(deserializeInputTree(tree, outputTreeBuilder));
  }
}
