import merge from 'lodash/merge';
import { NodesInputsTreeBuilder } from '@/modules/NodesInputsTreeBuilder';
import { NodesOutputsTreeBuilder } from '@/modules/NodesOutputsTreeBuilder';
import checkStronglyConnected from './checkStronglyConnected';
import {
  NodeInputValidator,
  NodesValidatorTreeBuilder,
} from '@/modules/NodesValidatorTreeBuilder';
import { NodesPropertyTreeBuilder } from '@/modules/NodesPropertyTreeBuilder';

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

  const inputNode = merge(
    inputTree.value.nodes?.[inputNodeId],
    merge(
      propertyTree.value.nodes?.[inputNodeId],
      validatorTree.value.nodes?.[inputNodeId],
    ),
  );

  const inputSocket = inputNode?.inputs?.[inputId];
  const outputSocket = outputNode?.outputs?.[outputId];

  const defaultValidator: NodeInputValidator = ({ type }) =>
    type === inputSocket?.type;

  const validator = inputSocket.validator ?? defaultValidator;

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
