import {
  SerializedNodesPropertyTree,
  NodesPropertyTree,
} from '@/components/NodesPropertyTreeBuilder';

const deserializeNodesPropertyTree = <T extends SerializedNodesPropertyTree>(
  serializedTree: T,
): NodesPropertyTree => serializedTree;

export default deserializeNodesPropertyTree;
