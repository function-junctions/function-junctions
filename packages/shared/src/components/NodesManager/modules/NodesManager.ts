import { NodesInputsTreeBuilder } from '@/components/NodesInputsTreeBuilder';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import { checkNodesConnection } from '@/components/NodesManager';
import { NodesValidatorTreeBuilder } from '@/components/NodesValidatorTreeBuilder';
import { NodesPropertyTreeBuilder } from '@/components/NodesPropertyTreeBuilder';
import { NodesBlueprint } from '@/components/Instance';

export type NodesManagerParams = {
  inputTree: NodesInputsTreeBuilder;
  outputTree: NodesOutputsTreeBuilder;
  validatorTree: NodesValidatorTreeBuilder;
  propertyTree: NodesPropertyTreeBuilder;
  blueprint: NodesBlueprint;
};

export default class NodesManager {
  public inputTree: NodesInputsTreeBuilder;
  public outputTree: NodesOutputsTreeBuilder;
  public validatorTree: NodesValidatorTreeBuilder;
  public propertyTree: NodesPropertyTreeBuilder;
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
