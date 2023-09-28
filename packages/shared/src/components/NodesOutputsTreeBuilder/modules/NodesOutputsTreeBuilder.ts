import { Observable } from '@/components';
import { Output, SerializedOutput } from '@/components/Output';
import { deserializeOutputTree } from '..';

export type SerializedNodeOutputsTree = {
  outputs: Record<string, SerializedOutput<unknown>>;
};

export type SerializedNodesOutputsTree = Record<
  string,
  SerializedNodeOutputsTree
>;

export type NodeOutputsTree = {
  outputs: Record<string, Output<unknown>>;
};

export type NodesOutputsTree = Record<string, SerializedNodeOutputsTree>;

export default class NodesOutputsTreeBuilder<
  T extends SerializedNodesOutputsTree = SerializedNodesOutputsTree,
> extends Observable<T> {
  constructor(tree: T) {
    super(deserializeOutputTree<T>(tree));
  }
}
