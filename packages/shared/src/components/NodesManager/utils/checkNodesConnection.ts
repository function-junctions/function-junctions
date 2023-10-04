import merge from 'lodash/merge';
import { NodesInputsTreeBuilder } from '@/components/NodesInputsTreeBuilder';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import checkStronglyConnected from './checkStronglyConnected';

type ConnectNodesParams = {
  output: {
    nodeId: string;
    outputId: string;
  };
  input: {
    nodeId: string;
    inputId: string;
  };
  inputTree: NodesInputsTreeBuilder;
  outputTree: NodesOutputsTreeBuilder;
};

const checkNodesConnection = ({
  output,
  input,
  inputTree,
  outputTree,
}: ConnectNodesParams) => {
  const { nodeId: outputNodeId, outputId } = output;
  const { nodeId: inputNodeId, inputId } = input;

  const outputNode =
    outputTree.value.nodes?.[outputNodeId]?.outputs?.[outputId];
  const inputNode = inputTree.value.nodes?.[inputNodeId]?.inputs?.[inputId];

  if (!inputNode)
    throw new Error(
      `The reference for the specified input ${inputId} in the node ${inputNodeId} was not found.`,
    );

  if (!outputNode)
    throw new Error(
      `The reference for the specified output ${outputId} in the node ${outputNodeId} was not found.`,
    );

  if (inputNodeId === outputNodeId)
    throw new Error(`You cannot connect a node to itself`);

  const isStronglyConnected = checkStronglyConnected(
    inputNodeId,
    merge(inputTree.serialize(), {
      nodes: {
        [inputNodeId]: {
          inputs: {
            [inputId]: {
              connection: {
                outputId,
                nodeId: outputNodeId,
              },
            },
          },
        },
      },
    }),
  );

  return isStronglyConnected;
};

export default checkNodesConnection;
