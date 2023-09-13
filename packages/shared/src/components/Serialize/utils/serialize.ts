import keys from 'lodash/keys';
import { StatefulNode, StatefulNodeTree } from '../../Tree/utils/TreeBuilder';
import {
  InputSocket,
  OutputSocket,
  SerializedInputSocket,
  SerializedOutputSocket,
} from '@/components/IO';

export type SerializedNodeInputs = Record<string, SerializedInputSocket>;
export type SerializedNodeOutputs = Record<string, SerializedOutputSocket>;

export type SerializedNode = {
  inputs: SerializedNodeInputs;
  outputs: SerializedNodeOutputs;
};

export type SerializedNodeTree = Record<string, SerializedNode>;

export type SerializedTree = {
  nodes: SerializedNodeTree;
};

export const serializeNodeInput = (
  inputs: InputSocket<unknown>,
): SerializedInputSocket => ({
  type: inputs.type,
  connection: inputs.connection,
});

export const serializeNodeOutput = (
  output: OutputSocket<unknown>,
): SerializedOutputSocket => ({
  type: output.type,
});

export const serializeNode = (node: StatefulNode): SerializedNode => {
  const inputs = keys(node.inputs).reduce((prevInputs, input) => {
    const serializedInput = serializeNodeInput(node.inputs[input]);
    return {
      ...prevInputs,
      [input]: serializedInput,
    };
  }, {});

  const outputs = keys(node.outputs).reduce((prevOutputs, output) => {
    const serializeOutput = serializeNodeOutput(node.outputs[output]);
    return {
      ...prevOutputs,
      [output]: serializeOutput,
    };
  }, {});

  return {
    inputs,
    outputs,
  };
};

export const serializeNodes = (nodes: StatefulNodeTree): SerializedNodeTree =>
  keys(nodes).reduce((prevNodes, nodeKey) => {
    const node = serializeNode(nodes[nodeKey]);

    return {
      ...prevNodes,
      node,
    };
  }, {});
