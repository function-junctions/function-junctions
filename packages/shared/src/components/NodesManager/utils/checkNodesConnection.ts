import merge from 'lodash/merge';
import { NodesInputsTreeBuilder } from '@/components/NodesInputsTreeBuilder';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import checkStronglyConnected from './checkStronglyConnected';
import { NodesValidatorTreeBuilder } from '@/components/NodesValidatorTreeBuilder';
import { NodesPropertyTreeBuilder } from '@/components/NodesPropertyTreeBuilder';

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
  validatorTree: NodesValidatorTreeBuilder;
  propertyTree: NodesPropertyTreeBuilder;
};

const checkNodesConnection = ({
  output,
  input,
  inputTree,
  outputTree,
  validatorTree,
  propertyTree,
}: ConnectNodesParams) => {
  const { nodeId: outputNodeId, outputId } = output;
  const { nodeId: inputNodeId, inputId } = input;

  const outputNode = merge(
    outputTree.value.nodes?.[outputNodeId],
    propertyTree.value.nodes?.[outputNodeId],
  );
  const inputNode = inputTree.value.nodes?.[inputNodeId];

  const validator =
    validatorTree.value.nodes?.[inputNodeId].inputs?.[inputNodeId].validator;

  const inputSocket = inputNode?.inputs?.[inputId];
  const outputSocket = outputNode?.outputs?.[outputId];

  if (!inputSocket)
    throw new Error(
      `The reference for the specified input ${inputId} in the node ${inputNodeId} was not found.`,
    );

  if (!outputSocket)
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

  return isStronglyConnected && validator(outputSocket);
};

export default checkNodesConnection;
