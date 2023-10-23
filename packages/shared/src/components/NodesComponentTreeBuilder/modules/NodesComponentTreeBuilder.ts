import { Observable } from '@/components';
import { deserializeNodesComponentTree } from '@/components/NodesComponentTreeBuilder';

export type SerializedNodeComponentTree<T = unknown> = {
  component: T;
};

export type SerializedNodesComponentTree = {
  nodes: Record<string, SerializedNodeComponentTree>;
};

export type NodeComponentTree<T = unknown> = {
  component: T;
};

export type NodesComponentTree = {
  nodes: Record<string, NodeComponentTree>;
};

export default class NodesComponentTreeBuilder<
  T extends SerializedNodesComponentTree = SerializedNodesComponentTree,
> extends Observable<NodesComponentTree> {
  constructor(tree: T) {
    super(deserializeNodesComponentTree<T>(tree));
  }
}
