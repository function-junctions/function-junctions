import { Observable } from '@shared/Observable';
import {
  InitialIOPropertyTree,
  InitialNodesPropertyTree,
} from '@shared/NodesPropertyTreeBuilder';
import { setupNodesValidatorTree } from '@shared/NodesValidatorTreeBuilder';
import { InitialOutput } from '@shared/Output';

export type NodeInputValidator = (
  incomingOutput: InitialOutput<unknown> & InitialIOPropertyTree,
) => boolean;

export type InitialNodeValidatorTreeInput = {
  validator?: NodeInputValidator;
};

export type InitialNodeValidatorTree = {
  inputs: Record<string, InitialNodeValidatorTreeInput>;
};

export type InitialNodesValidatorTree = {
  nodes: Record<string, InitialNodeValidatorTree>;
};

export type NodeValidatorTreeInput = {
  validator: NodeInputValidator;
};

export type NodeValidatorTree = {
  type: string;
  inputs: Record<string, NodeValidatorTreeInput>;
  outputs: Record<string, NodeValidatorTreeInput>;
};

export type NodesValidatorTree = {
  nodes: Record<string, NodeValidatorTree>;
};

export default class NodesValidatorTreeBuilder<
  T extends InitialNodesValidatorTree = InitialNodesValidatorTree,
  TPropertyTree extends InitialNodesPropertyTree = InitialNodesPropertyTree,
> extends Observable<NodesValidatorTree> {
  constructor(tree: T, propertyTree: TPropertyTree) {
    super(setupNodesValidatorTree(tree, propertyTree));
  }
}
