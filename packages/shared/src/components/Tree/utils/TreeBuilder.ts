import { Builder } from '@/components';
import { InputSocket, OutputSocket } from '@/components/IO';

export type StatefulNodeInputs = Record<string, InputSocket<unknown>>;
export type StatefulNodeOutputs = Record<string, OutputSocket<unknown>>;

export type StatefulNode = {
  inputs: StatefulNodeInputs;
  outputs: StatefulNodeOutputs;
};

export type StatefulNodeTree = Record<string, StatefulNode>;

export type StatefulTree = {
  nodes: StatefulNodeTree;
};

export default class TreeBuilder extends Builder<{ tree: StatefulTree }> {
  constructor(initialTree: StatefulTree) {
    super({ tree: initialTree });
  }
}
