import { Observable } from '@/components';
import { deserializeNodesPositionTree } from '@/components/NodesPositionTreeBuilder';

export type SerializedNodePositionTree = Partial<{
  x: number;
  y: number;
}>;

export type SerializedNodesPositionTree = {
  nodes: Record<string, SerializedNodePositionTree>;
};

export type NodePositionTree = Partial<{
  x: number;
  y: number;
}>;

export type NodesPositionTree = {
  nodes: Record<string, NodePositionTree>;
};

export default class NodesPositionTreeBuilder<
  T extends SerializedNodesPositionTree = SerializedNodesPositionTree,
> extends Observable<NodesPositionTree> {
  constructor(tree: T) {
    super(deserializeNodesPositionTree<T>(tree));
  }
}
