import {
  SerializedNodesOutputsTree,
  NodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';

const deserializeOutputTree = <T extends SerializedNodesOutputsTree>(
  serializedTree: T,
): NodesOutputsTree => serializedTree;

export default deserializeOutputTree;
