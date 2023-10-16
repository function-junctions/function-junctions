import merge from 'lodash/merge';
import { entries, isEqual, trim, values } from 'lodash';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import { SerializedOutput } from '@/components/Output';
import {
  NodeInputsTree,
  NodesInputsTreeBuilder,
} from '@/components/NodesInputsTreeBuilder';

export default class NodesOutputsManager {
  public readonly outputTree: NodesOutputsTreeBuilder;
  public readonly inputTree: NodesInputsTreeBuilder;

  constructor(
    outputTree: NodesOutputsTreeBuilder,
    inputTree: NodesInputsTreeBuilder,
  ) {
    this.outputTree = outputTree;
    this.inputTree = inputTree;
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

  public deleteOutput = (nodeId: string, outputId: string): void => {
    const { nodes: inputNodes } = this.inputTree.value;
    const { nodes: outputNodes } = this.outputTree.value;
    if (!(nodeId in outputNodes)) return;

    const targetOutputNode = outputNodes[nodeId];
    if (!(outputId in targetOutputNode.outputs)) return;

    entries(inputNodes)
      .filter(([, nodeInputs]) =>
        // update to also get the input id if referenced
        this.doesNodeReferenceOutput(nodeInputs, outputId),
      )
      .forEach(() => {
        // delete the input
      });

    // updated to set the value using reduce
    delete targetOutputNode.outputs[outputId];
  };

  private doesNodeReferenceOutput = (
    nodeInputs: NodeInputsTree,
    outputId: string,
  ): boolean =>
    values(nodeInputs.inputs).some((input) =>
      isEqual(trim(input.value.connection?.outputId), trim(outputId)),
    );
}
