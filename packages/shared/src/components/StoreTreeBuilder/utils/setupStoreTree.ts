import { keys } from 'lodash';
import { InitialStoresTree, StoresTree } from '@/components/StoreTreeBuilder';

const setupStoreTree = <T extends InitialStoresTree>(tree: T): StoresTree => ({
  nodes: keys(tree.nodes).reduce((prevNodeStores, key) => {
    const { store } = tree.nodes[key];

    return {
      ...prevNodeStores,
      [key]: { store },
    };
  }, {}),
});

export default setupStoreTree;
