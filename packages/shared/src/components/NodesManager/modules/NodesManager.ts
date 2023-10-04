import { NodesInputsTreeBuilder } from '@/components/NodesInputsTreeBuilder';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import { checkNodesConnection } from '@/components/NodesManager';

export default class NodesManager {
  public inputTree: NodesInputsTreeBuilder;
  public outputTree: NodesOutputsTreeBuilder;

  constructor(
    inputTree: NodesInputsTreeBuilder,
    outputTree: NodesOutputsTreeBuilder,
  ) {
    this.inputTree = inputTree;
    this.outputTree = outputTree;
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
