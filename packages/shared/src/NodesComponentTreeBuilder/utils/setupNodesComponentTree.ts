import keys from 'lodash/keys';
import {
  InitialNodesComponentTree,
  NodesComponentTree,
} from '@shared/NodesComponentTreeBuilder';

const setupNodesComponentTree = <T extends InitialNodesComponentTree>(
  initialTree: T,
): NodesComponentTree => ({
  nodes: keys(initialTree.nodes).reduce((prevNodePositions, key) => {
    const { component } = initialTree.nodes[key];

    return {
      ...prevNodePositions,
      [key]: { component },
    };
  }, {}),
});

export default setupNodesComponentTree;
