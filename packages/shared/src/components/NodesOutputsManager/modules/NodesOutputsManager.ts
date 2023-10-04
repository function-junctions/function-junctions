import merge from 'lodash/merge';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import { SerializedOutput } from '@/components/Output';

export default class NodesOutputsManager {
  public outputTree: NodesOutputsTreeBuilder;

  constructor(outputTree: NodesOutputsTreeBuilder) {
    this.outputTree = outputTree;
  }

  public createOutput = <T = unknown>(
    nodeId: string,
    output: {
      id: string;
    } & SerializedOutput<T>,
  ) => {
    if (this.outputTree.value.nodes?.[nodeId])
      throw new Error(
        `The node "${nodeId}" you are attempting to create already exists`,
      );

    const { id, ...restOutput } = output;

    if (this.outputTree.value.nodes?.[nodeId]?.outputs?.[id])
      throw new Error(
        `The output "${id}" you are attempting to create already exists`,
      );

    merge(this.outputTree.value.nodes, {
      [nodeId]: {
        outputs: {
          [id]: restOutput,
        },
      },
    });
  };
}
