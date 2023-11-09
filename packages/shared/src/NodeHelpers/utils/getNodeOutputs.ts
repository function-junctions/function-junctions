import { NodesOutputsTree } from '@shared/NodesOutputsTreeBuilder';
import { Output } from '@shared/Output';

const getNodeOutput = (
  tree: NodesOutputsTree,
  nodeId: string,
  outputId: string,
): Output<unknown> | undefined => {
  const treeNodes = tree.nodes[nodeId];

  if (!treeNodes) {
    return undefined;
  }

  const nodeOutput = treeNodes.outputs[outputId];

  if (!nodeOutput) {
    return undefined;
  }

  return nodeOutput;
};

export default getNodeOutput;
