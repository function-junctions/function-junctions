import { Observable } from '@/components';
import { setupNodesPropertyTree } from '@/components/NodesPropertyTreeBuilder';

export type InitialIOPropertyTree = {
  type: string;
  readonly?: boolean;
};

export type InitialNodePropertyTree = {
  type: string;
  inputs?: Record<string, InitialIOPropertyTree>;
  outputs?: Record<string, InitialIOPropertyTree>;
};

export type InitialNodesPropertyTree = {
  nodes: Record<string, InitialNodePropertyTree>;
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
  T extends InitialNodesPropertyTree = InitialNodesPropertyTree,
> extends Observable<NodesPropertyTree> {
  constructor(tree: T) {
    super(setupNodesPropertyTree(tree));
  }
}
