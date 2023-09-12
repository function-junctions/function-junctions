import TreeBuilder, { StatefulTree } from './TreeBuilder';
import { serializeNodes } from '@/components/Serialize';

export const initialTree = {
  nodes: {},
};

export default class Tree {
  public tree: StatefulTree;

  constructor() {
    const builder = new TreeBuilder(initialTree);

    this.tree = builder.create().tree;
  }

  public serialize = (): string => {
    const { nodes } = this.tree;

    return JSON.stringify({
      nodes: serializeNodes(nodes),
    });
  };
}
