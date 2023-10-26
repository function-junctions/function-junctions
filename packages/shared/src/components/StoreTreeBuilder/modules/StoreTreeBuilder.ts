import { Observable } from '@/components';
import { setupStoreTree } from '@/components/StoreTreeBuilder';

export type InitialStoreTree = {
  store: Record<string, unknown>;
};

export type InitialStoresTree = {
  nodes: Record<string, StoreTree>;
};

export type StoreTree = {
  store: Record<string, unknown>;
};

export type StoresTree = {
  nodes: Record<string, StoreTree>;
};

export default class StoreTreeBuilder<
  T extends InitialStoresTree = InitialStoresTree,
> extends Observable<StoresTree> {
  constructor(tree: T) {
    super(setupStoreTree(tree));
  }
}
