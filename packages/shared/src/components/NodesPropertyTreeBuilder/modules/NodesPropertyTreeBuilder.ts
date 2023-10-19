import { Observable } from '@/components';
import { deserializeNodesPropertyTree } from '@/components/NodesPropertyTreeBuilder';

export type SerializedIOPropertyTree = {
  type: string;
  readonly?: boolean;
};

export type SerializedNodePropertyTree = {
  type: string;
  inputs?: Record<string, SerializedIOPropertyTree>;
  outputs?: Record<string, SerializedIOPropertyTree>;
};

export type SerializedNodesPropertyTree = {
  nodes: Record<string, SerializedNodePropertyTree>;
};

export type IOPropertyTree = {
  type: string;
  readonly?: boolean;
};

export type NodePropertyTree = {
  type: string;
  inputs?: Record<string, IOPropertyTree>;
  outputs?: Record<string, IOPropertyTree>;
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
