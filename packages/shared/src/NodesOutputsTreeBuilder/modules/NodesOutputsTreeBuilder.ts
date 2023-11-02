import { Observable } from '@shared/Observable';
import { Output, InitialOutput } from '@shared/Output';
import { setupOutputTree } from '@shared/NodesOutputsTreeBuilder';

export type InitialNodeOutputsTree = {
  outputs: Record<string, InitialOutput<unknown>>;
};

export type InitialNodesOutputsTree = {
  nodes: Record<string, InitialNodeOutputsTree>;
};

export type NodeOutputsTree = {
  outputs: Record<string, Output<unknown>>;
};

export type NodesOutputsTree = {
  nodes: Record<string, NodeOutputsTree>;
};

export default class NodesOutputsTreeBuilder<
  T extends InitialNodesOutputsTree = InitialNodesOutputsTree,
> extends Observable<NodesOutputsTree> {
  constructor(tree: T) {
    super(setupOutputTree<T>(tree));
  }
}
