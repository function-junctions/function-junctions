import keys from 'lodash/keys';
import {
  InitialNodesOutputsTree,
  NodesOutputsTree,
} from '@/NodesOutputsTreeBuilder';

const setupOutputTree = <T extends InitialNodesOutputsTree>(
  initialTree: T,
): NodesOutputsTree => ({
  nodes: keys(initialTree.nodes).reduce((prevNodePositions, key) => {
    const { outputs } = initialTree.nodes[key];

    return {
      ...prevNodePositions,
      [key]: { outputs },
    };
  }, {}),
});

export default setupOutputTree;
