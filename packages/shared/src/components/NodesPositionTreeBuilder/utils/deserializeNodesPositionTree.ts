import keys from 'lodash/keys';
import {
  SerializedNodesPositionTree,
  NodesPositionTree,
} from '@/components/NodesPositionTreeBuilder';

const deserializeNodesPositionTree = <T extends SerializedNodesPositionTree>(
  serializedTree: T,
): NodesPositionTree => ({
  nodes: keys(serializedTree.nodes).reduce((prevNodePositions, key) => {
    const { x, y } = serializedTree.nodes[key];

    return {
      ...prevNodePositions,
      [key]: { x, y },
    };
  }, {}),
});

export default deserializeNodesPositionTree;
