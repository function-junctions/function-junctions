import { Observable } from '@/components';
import { deserializeNodesPropertyTree } from '@/components/NodesPropertyTreeBuilder';

export type SerializedIOPropertyTree<T extends string> = {
  type: T;
  readonly?: boolean;
};

export type SerializedNodePropertyTree = {
  inputs: Record<string, SerializedIOPropertyTree<string>>;
  outputs: Record<string, SerializedIOPropertyTree<string>>;
};

export type SerializedNodesPropertyTree = {
  nodes: Record<string, SerializedNodePropertyTree>;
};

export type IOPropertyTree<T extends string> = {
  type: T;
  readonly?: boolean;
};

export type NodePropertyTree = {
  inputs: Record<string, IOPropertyTree<string>>;
  outputs: Record<string, IOPropertyTree<string>>;
};

export type NodesPropertyTree = {
  nodes: Record<string, NodePropertyTree>;
};

export default class NodesPropertyTreeBuilder<
  T extends SerializedNodesPropertyTree = SerializedNodesPropertyTree,
> extends Observable<NodesPropertyTree> {
  constructor(tree: T) {
    super(deserializeNodesPropertyTree(tree));
  }
}
