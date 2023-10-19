import { Observable } from '@/components';
import {
  SerializedIOPropertyTree,
  SerializedNodesPropertyTree,
} from '@/components/NodesPropertyTreeBuilder';
import { deserializeNodesValidatorTree } from '@/components/NodesValidatorTreeBuilder';
import { SerializedOutput } from '@/components/Output';

export type NodeInputValidator = (
  incomingOutput: SerializedOutput<unknown> & SerializedIOPropertyTree,
) => boolean;

export type SerializedNodeValidatorTreeInput = {
  validator?: NodeInputValidator;
};

export type SerializedNodeValidatorTree = {
  inputs: Record<string, SerializedNodeValidatorTreeInput>;
};

export type SerializedNodesValidatorTree = {
  nodes: Record<string, SerializedNodeValidatorTree>;
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
  T extends SerializedNodesValidatorTree = SerializedNodesValidatorTree,
  TPropertyTree extends
    SerializedNodesPropertyTree = SerializedNodesPropertyTree,
> extends Observable<NodesValidatorTree> {
  constructor(tree: T, propertyTree: TPropertyTree) {
    super(deserializeNodesValidatorTree(tree, propertyTree));
  }
}
