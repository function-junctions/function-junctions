import TreeBuilder, { StatefulTree } from './TreeBuilder';
import { serializeNodes } from '@/components/Serialize';

const initialTree = {
  nodes: {},
};

export default class Tree {
  public value: StatefulTree;

  constructor() {
    const builder = new TreeBuilder(initialTree);

    this.value = builder.create().tree;
  }

  public serialize = (): string => {
    const { nodes } = this.value;

    return JSON.stringify({
      nodes: serializeNodes(nodes),
    });
  };
}
