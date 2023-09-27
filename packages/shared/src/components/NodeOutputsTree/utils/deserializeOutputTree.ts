import { SerializedNodesOutputsTree } from '..';

const deserializeOutputTree = <T extends SerializedNodesOutputsTree>(
  serializedTree: T,
): T => serializedTree;

export default deserializeOutputTree;
