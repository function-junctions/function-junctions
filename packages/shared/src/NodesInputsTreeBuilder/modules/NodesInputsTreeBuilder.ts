import { Observable } from '@/modules';
import { Input, InitialInput } from '@/modules/InputBuilder';
import {
  NodesOutputsTreeBuilder,
  InitialNodesOutputsTree,
} from '@/modules/NodesOutputsTreeBuilder';
import {
  setupInputTree,
  serializeInputTree,
} from '@/modules/NodesInputsTreeBuilder';

export type InitialNodeInputsTree = {
  inputs: Record<string, InitialInput>;
};
export type InitialNodesInputsTree = {
  nodes: Record<string, InitialNodeInputsTree>;
};

export type NodeInputsTree = {
  inputs: Record<string, Observable<Input<unknown>>>;
};
export type NodesInputsTree = {
  nodes: Record<string, NodeInputsTree>;
};

export default class NodesInputsTreeBuilder<
  T extends InitialNodesInputsTree = InitialNodesInputsTree,
  TOutput extends InitialNodesOutputsTree = InitialNodesOutputsTree,
> extends Observable<NodesInputsTree> {
  constructor(tree: T, outputTreeBuilder: NodesOutputsTreeBuilder<TOutput>) {
    super(setupInputTree<T, TOutput>(tree, outputTreeBuilder));
  }

  public serialize = () => serializeInputTree(this.value);
}
