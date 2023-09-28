import keys from 'lodash/keys';
import merge from 'lodash/merge';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import { SerializedNodesInputsTree } from '..';
import { NodesInputsTree } from '../modules';
import { InputBuilder } from '@/components/InputBuilder';

const deserializeInputTree = <T extends SerializedNodesInputsTree>(
  serializedTree: T,
  outputsTree: NodesOutputsTreeBuilder,
): NodesInputsTree => {
  const tree = outputsTree.value;

  return keys(serializedTree).reduce((prevInputsTree, nodeKey) => {
    const { inputs } = serializedTree[nodeKey];

    const deserializedInputs = keys(inputs).reduce((prevInput, inputKey) => {
      const { connection } = inputs[inputKey];

      const initialOutputValue =
        tree?.[connection?.nodeId ?? '']?.outputs?.[connection?.outputId ?? ''];

      const input = new InputBuilder<typeof initialOutputValue>(
        {
          connection,
          value: initialOutputValue,
        },
        tree,
      );

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
