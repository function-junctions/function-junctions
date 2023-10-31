import keys from 'lodash/keys';
import {
  InitialNodesValidatorTree,
  NodesValidatorTree,
  NodeInputValidator,
} from '@shared/NodesValidatorTreeBuilder';
import { InitialNodesPropertyTree } from '@shared/NodesPropertyTreeBuilder';

const setupNodesValidatorTree = <T extends InitialNodesValidatorTree>(
  initialTree: T,
  initialPropertyTree: InitialNodesPropertyTree,
): NodesValidatorTree => ({
  nodes: keys(initialTree.nodes).reduce((prevNodePositions, key) => {
    const { inputs } = initialTree.nodes[key];

    const inputProperties = keys(inputs).reduce((prevInputs, inputKey) => {
      const { validator } = inputs[inputKey];
      const defaultValidator: NodeInputValidator = (output) =>
        output.type === initialPropertyTree.nodes[key].inputs?.[inputKey].type;

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

export default setupNodesValidatorTree;
