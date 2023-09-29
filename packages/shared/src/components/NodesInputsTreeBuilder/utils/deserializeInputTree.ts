import keys from 'lodash/keys';
import merge from 'lodash/merge';
import {
  NodesOutputsTreeBuilder,
  SerializedNodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';
import { SerializedNodesInputsTree } from '..';
import { NodesInputsTree } from '../modules';
import { InputBuilder } from '@/components/InputBuilder';

const deserializeInputTree = <
  T extends SerializedNodesInputsTree,
  TOutput extends SerializedNodesOutputsTree = SerializedNodesOutputsTree,
>(
  { nodes: serializedTree }: T,
  outputsTree: NodesOutputsTreeBuilder<TOutput>,
): NodesInputsTree => {
  const tree = outputsTree.value;

  return {
    nodes: keys(serializedTree).reduce((prevInputsTree, nodeKey) => {
      const { inputs } = serializedTree[nodeKey];

      const deserializedInputs = keys(inputs).reduce((prevInput, inputKey) => {
        const { connection } = inputs[inputKey];

        const initialOutputValue =
          tree.nodes?.[connection?.nodeId ?? '']?.outputs?.[
            connection?.outputId ?? ''
          ].value;

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
    }, {}),
  };
};

export default deserializeInputTree;
