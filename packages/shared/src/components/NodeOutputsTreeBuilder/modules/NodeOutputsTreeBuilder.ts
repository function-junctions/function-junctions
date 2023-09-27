import { Observable } from '@/components';
import { OutputSocket, SerializedOutputSocket } from '@/components/Output';
import { deserializeOutputTree } from '..';

export type SerializedNodeOutputsTree = {
  outputs: Record<string, SerializedOutputSocket<unknown>>;
};

export type SerializedNodesOutputsTree = Record<
  string,
  SerializedNodeOutputsTree
>;

export type NodeOutputsTree = {
  outputs: Record<string, OutputSocket<unknown>>;
};

export type NodesOutputsTree = Record<string, SerializedNodeOutputsTree>;

export default class NodeOutputsTreeBuilder<
  T extends SerializedNodesOutputsTree = SerializedNodesOutputsTree,
> extends Observable<T> {
  constructor(tree: T) {
    super(deserializeOutputTree<T>(tree));
  }
}
