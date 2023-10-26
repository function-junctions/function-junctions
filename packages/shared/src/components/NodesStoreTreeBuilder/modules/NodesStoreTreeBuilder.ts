import { Observable } from '@/components';
import { setupStoreTree } from '@/components/NodesStoreTreeBuilder';

export type InitialNodeStoreTree = {
  store: Record<string, unknown>;
};

export type InitialNodesStoreTree = {
  nodes: Record<string, InitialNodeStoreTree>;
};

export type NodeStoreTree = {
  store: Record<string, unknown>;
};

export type NodesStoreTree = {
  nodes: Record<string, NodeStoreTree>;
};

export default class NodesStoreTreeBuilder<
  T extends InitialNodesStoreTree = InitialNodesStoreTree,
> extends Observable<NodesStoreTree> {
  constructor(tree: T) {
    super(setupStoreTree(tree));
  }
}
