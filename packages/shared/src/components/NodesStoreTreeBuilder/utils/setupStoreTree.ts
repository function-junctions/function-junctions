import { keys } from 'lodash';
import {
  InitialNodesStoreTree,
  NodesStoreTree,
} from '@/components/NodesStoreTreeBuilder';

const setupStoreTree = <T extends InitialNodesStoreTree>(
  tree: T,
): NodesStoreTree => ({
  nodes: keys(tree.nodes).reduce((prevNodeStores, key) => {
    const { store } = tree.nodes[key];

    return {
      ...prevNodeStores,
      [key]: { store },
    };
  }, {}),
});

export default setupStoreTree;
