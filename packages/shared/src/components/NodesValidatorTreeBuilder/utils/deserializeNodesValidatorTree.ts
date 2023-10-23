import keys from 'lodash/keys';
import {
  SerializedNodesValidatorTree,
  NodesValidatorTree,
  NodeInputValidator,
} from '@/components/NodesValidatorTreeBuilder';
import { SerializedNodesPropertyTree } from '@/components/NodesPropertyTreeBuilder';

const deserializeNodesValidatorTree = <T extends SerializedNodesValidatorTree>(
  serializedTree: T,
  serializedPropertyTree: SerializedNodesPropertyTree,
): NodesValidatorTree => ({
  nodes: keys(serializedTree.nodes).reduce((prevNodePositions, key) => {
    const { inputs } = serializedTree.nodes[key];

    const inputProperties = keys(inputs).reduce((prevInputs, inputKey) => {
      const { validator } = inputs[inputKey];
      const defaultValidator: NodeInputValidator = (output) =>
        output.type ===
        serializedPropertyTree.nodes[key].inputs?.[inputKey].type;

      return {
        ...prevInputs,
        [inputKey]: { validator: validator ?? defaultValidator },
      };
    }, {});

    return {
      ...prevNodePositions,
      [key]: {
        inputs: inputProperties,
      },
    };
  }, {}),
});

export default deserializeNodesValidatorTree;
