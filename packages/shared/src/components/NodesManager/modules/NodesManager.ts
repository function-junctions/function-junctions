import { NodesInputsTreeBuilder } from '@/components/NodesInputsTreeBuilder';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import { checkNodesConnection } from '@/components/NodesManager';
import { NodesValidatorTreeBuilder } from '@/components/NodesValidatorTreeBuilder';
import { NodesPropertyTreeBuilder } from '@/components/NodesPropertyTreeBuilder';

export type NodesManagerParams = {
  inputTree: NodesInputsTreeBuilder;
  outputTree: NodesOutputsTreeBuilder;
  validatorTree: NodesValidatorTreeBuilder;
  propertyTree: NodesPropertyTreeBuilder;
};

export default class NodesManager {
  public inputTree: NodesInputsTreeBuilder;
  public outputTree: NodesOutputsTreeBuilder;
  public validatorTree: NodesValidatorTreeBuilder;
  public propertyTree: NodesPropertyTreeBuilder;

  constructor({
    inputTree,
    outputTree,
    validatorTree,
    propertyTree,
  }: NodesManagerParams) {
    this.inputTree = inputTree;
    this.outputTree = outputTree;
    this.validatorTree = validatorTree;
    this.propertyTree = propertyTree;
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
