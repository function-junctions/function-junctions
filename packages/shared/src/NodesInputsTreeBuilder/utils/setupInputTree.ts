import keys from 'lodash/keys';
import merge from 'lodash/merge';
import {
  NodesOutputsTreeBuilder,
  InitialNodesOutputsTree,
} from '@/modules/NodesOutputsTreeBuilder';
import {
  InitialNodesInputsTree,
  NodesInputsTree,
} from '@/modules/NodesInputsTreeBuilder';
import { InputBuilder } from '@/modules/InputBuilder';

const setupInputTree = <
  T extends InitialNodesInputsTree,
  TOutput extends InitialNodesOutputsTree = InitialNodesOutputsTree,
>(
  { nodes: initialTree }: T,
  outputsTree: NodesOutputsTreeBuilder<TOutput>,
): NodesInputsTree => {
  const tree = outputsTree.value;

  return {
    nodes: keys(initialTree).reduce((prevInputsTree, nodeKey) => {
      const { inputs } = initialTree[nodeKey];

      const setupdInputs = keys(inputs).reduce((prevInput, inputKey) => {
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
          inputs: setupdInputs,
        },
      });
    }, {}),
  };
};

export default setupInputTree;
