import keys from 'lodash/keys';
import {
  InitialNodesPositionTree,
  NodesPositionTree,
} from '@/modules/NodesPositionTreeBuilder';

const setupNodesPositionTree = <T extends InitialNodesPositionTree>(
  initialTree: T,
): NodesPositionTree => ({
  nodes: keys(initialTree.nodes).reduce((prevNodePositions, key) => {
    const { x, y } = initialTree.nodes[key];

    return {
      ...prevNodePositions,
      [key]: { x, y },
    };
  }, {}),
});

export default setupNodesPositionTree;
