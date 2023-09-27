import isNil from 'lodash/isNil';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import { NodeOutputsTreeBuilder } from '@/components/NodeOutputsTreeBuilder';
import { SerializedNodesInputsTree } from '..';
import { NodesInputsTree } from '../modules';
import { Observable } from '@/components';
import { InputSocket } from '@/components/Input';

const deserializeInputTree = <T extends SerializedNodesInputsTree>(
  serializedTree: T,
  outputsTree: NodeOutputsTreeBuilder,
): NodesInputsTree => {
  const outputsTreeValue = outputsTree.value;

  return keys(serializedTree).reduce((prevInputsTree, nodeKey) => {
    const { inputs } = serializedTree[nodeKey];

    const deserializedInputs = keys(inputs).reduce((prevInput, inputKey) => {
      const { connection } = inputs[inputKey];

      const initialOutputValue =
        outputsTreeValue?.[connection?.nodeId ?? '']?.outputs?.[
          connection?.outputId ?? ''
        ];

      const input = new Observable<InputSocket<unknown>>({
        connection,
        value: initialOutputValue,
      });

      input.subscribeToPath('connection', (inputConnection) => {
        if (!inputConnection) return;

        const { nodeId: connectedNodeId, outputId: connectedOutputId } =
          inputConnection;

        const value =
          outputsTreeValue?.[connectedNodeId]?.outputs?.[connectedOutputId];

        if (isNil(value)) return;

        input.value.value = value;
      });

      return merge(prevInput, { [inputKey]: input });
    }, {});

    return merge(prevInputsTree, {
      [nodeKey]: {
        inputs: deserializedInputs,
      },
    });
  }, {});
};

export default deserializeInputTree;
