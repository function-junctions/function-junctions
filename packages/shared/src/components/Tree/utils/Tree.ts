import TreeBuilder, { StatefulTree } from './TreeBuilder';
import { serializeNodes } from '@/components/Serialize';

const initialTree = {
  nodes: {},
};

export default class Tree {
  public value: StatefulTree;

  constructor(tree?: StatefulTree) {
    const builder = new TreeBuilder(tree ?? initialTree);

    this.value = builder.value.tree;
  }

  public serialize = (): string => {
    const { nodes } = this.value;

    return JSON.stringify({
      nodes: serializeNodes(nodes),
    });
  };
}
