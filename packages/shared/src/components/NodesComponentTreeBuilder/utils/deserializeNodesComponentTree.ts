import keys from 'lodash/keys';
import {
  SerializedNodesComponentTree,
  NodesComponentTree,
} from '@/components/NodesComponentTreeBuilder';

const deserializeNodesComponentTree = <T extends SerializedNodesComponentTree>(
  serializedTree: T,
): NodesComponentTree => ({
  nodes: keys(serializedTree.nodes).reduce((prevNodePositions, key) => {
    const { component } = serializedTree.nodes[key];

    return {
      ...prevNodePositions,
      [key]: { component },
    };
  }, {}),
});

export default deserializeNodesComponentTree;
