import { Observable } from '@/components';
import { setupNodesComponentTree } from '@/components/NodesComponentTreeBuilder';

export type InitialNodeComponentTree<T = unknown> = {
  component: T;
};

export type InitialNodesComponentTree = {
  nodes: Record<string, InitialNodeComponentTree>;
};

export type NodeComponentTree<T = unknown> = {
  component: T;
};

export type NodesComponentTree = {
  nodes: Record<string, NodeComponentTree>;
};

export default class NodesComponentTreeBuilder<
  T extends InitialNodesComponentTree = InitialNodesComponentTree,
> extends Observable<NodesComponentTree> {
  constructor(tree: T) {
    super(setupNodesComponentTree<T>(tree));
  }
}
