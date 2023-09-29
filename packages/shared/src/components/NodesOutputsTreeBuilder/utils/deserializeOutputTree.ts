import { SerializedNodesOutputsTree, NodesOutputsTree } from '..';

const deserializeOutputTree = <T extends SerializedNodesOutputsTree>(
  serializedTree: T,
): NodesOutputsTree => serializedTree;

export default deserializeOutputTree;
