import { Observable } from '@/Observable';
import { setupNodesPositionTree } from '@/NodesPositionTreeBuilder';

export type InitialNodePositionTree = Partial<{
  x: number;
  y: number;
}>;

export type InitialNodesPositionTree = {
  nodes: Record<string, InitialNodePositionTree>;
};

export type NodePositionTree = Partial<{
  x: number;
  y: number;
}>;

export type NodesPositionTree = {
  nodes: Record<string, NodePositionTree>;
};

export default class NodesPositionTreeBuilder<
  T extends InitialNodesPositionTree = InitialNodesPositionTree,
> extends Observable<NodesPositionTree> {
  constructor(tree: T) {
    super(setupNodesPositionTree<T>(tree));
  }
}
