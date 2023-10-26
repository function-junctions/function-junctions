import { NodesInputsTreeBuilder } from '@/NodesInputsTreeBuilder';
import { NodesOutputsTreeBuilder } from '@/NodesOutputsTreeBuilder';
import { checkNodesConnection } from '@/NodesManager';
import { NodesValidatorTreeBuilder } from '@/NodesValidatorTreeBuilder';
import { NodesPropertyTreeBuilder } from '@/NodesPropertyTreeBuilder';
import { NodesBlueprint } from '@/Instance';

export type NodesManagerParams = {
  inputTree: NodesInputsTreeBuilder;
  outputTree: NodesOutputsTreeBuilder;
  validatorTree: NodesValidatorTreeBuilder;
  propertyTree: NodesPropertyTreeBuilder;
  blueprint: NodesBlueprint;
};

export default class NodesManager {
  private inputTree: NodesInputsTreeBuilder;
  private outputTree: NodesOutputsTreeBuilder;
  private validatorTree: NodesValidatorTreeBuilder;
  private propertyTree: NodesPropertyTreeBuilder;
  public blueprint: NodesBlueprint;

  constructor({
    inputTree,
    outputTree,
    validatorTree,
    propertyTree,
    blueprint,
  }: NodesManagerParams) {
    this.inputTree = inputTree;
    this.outputTree = outputTree;
    this.validatorTree = validatorTree;
    this.propertyTree = propertyTree;
    this.blueprint = blueprint;
  }

  public connect = (
    input: {
      nodeId: string;
      inputId: string;
    },
    output: {
      nodeId: string;
      outputId: string;
    },
  ) => {
    const { nodeId: outputNodeId, outputId } = output;
    const { nodeId: inputNodeId, inputId } = input;

    const canConnect = checkNodesConnection({
      input,
      output,
      inputTree: this.inputTree,
      outputTree: this.outputTree,
      validatorTree: this.validatorTree,
      propertyTree: this.propertyTree,
    });

    const inputNode = this.inputTree.value.nodes[inputNodeId].inputs[inputId];

    if (canConnect) {
      inputNode.value.connection = {
        outputId,
        nodeId: outputNodeId,
      };
    }
  };
}
