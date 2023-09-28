import { SerializedNodesInputsTree } from '../NodesInputsTreeBuilder';
import { SerializedNodesOutputsTree } from '../NodesOutputsTreeBuilder';

export type SerializedTree = SerializedNodesOutputsTree &
  SerializedNodesInputsTree;

export default class TreeBuilder {}
