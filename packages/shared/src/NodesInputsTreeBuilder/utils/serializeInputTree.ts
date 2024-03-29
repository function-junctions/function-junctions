import keys from 'lodash/keys';
import merge from 'lodash/merge';
import {
  InitialNodesInputsTree,
  NodesInputsTree,
} from '@shared/NodesInputsTreeBuilder';

const serializeInputTree = <T extends NodesInputsTree>({
  nodes: initialTree,
}: T): InitialNodesInputsTree => ({
  nodes: keys(initialTree).reduce((prevNodes, nodeKey) => {
    const { inputs } = initialTree[nodeKey];

    return merge(prevNodes, {
      [nodeKey]: {
        inputs: keys(inputs).reduce((prevInputs, inputKey) => {
          const input = inputs?.[inputKey];

          if (!input) return prevInputs;

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
