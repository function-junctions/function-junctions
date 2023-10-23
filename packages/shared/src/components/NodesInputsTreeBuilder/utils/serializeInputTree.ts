import keys from 'lodash/keys';
import merge from 'lodash/merge';
import {
  SerializedNodesInputsTree,
  NodesInputsTree,
} from '@/components/NodesInputsTreeBuilder';

const serializeInputTree = <T extends NodesInputsTree>({
  nodes: serializedTree,
}: T): SerializedNodesInputsTree => ({
  nodes: keys(serializedTree).reduce((prevNodes, nodeKey) => {
    const { inputs } = serializedTree[nodeKey];

    return merge(prevNodes, {
      [nodeKey]: {
        inputs: keys(inputs).reduce((prevInputs, inputKey) => {
          const input = inputs[inputKey];
          return merge(prevInputs, {
            [inputKey]: {
              connection: input.value?.connection,
            },
          });
        }, {}),
      },
    });
  }, {}),
});

export default serializeInputTree;
