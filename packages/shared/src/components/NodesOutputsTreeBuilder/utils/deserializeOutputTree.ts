import keys from 'lodash/keys';
import {
  SerializedNodesOutputsTree,
  NodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';

const deserializeOutputTree = <T extends SerializedNodesOutputsTree>(
  serializedTree: T,
): NodesOutputsTree => ({
  nodes: keys(serializedTree.nodes).reduce((prevNodePositions, key) => {
    const { outputs } = serializedTree.nodes[key];

    return {
      ...prevNodePositions,
      [key]: { outputs },
    };
  }, {}),
});

export default deserializeOutputTree;
