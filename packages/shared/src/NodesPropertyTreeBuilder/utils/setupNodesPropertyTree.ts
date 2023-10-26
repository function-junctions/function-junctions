import keys from 'lodash/keys';
import {
  InitialNodesPropertyTree,
  NodesPropertyTree,
} from '@/modules/NodesPropertyTreeBuilder';

const setupNodesPropertyTree = <T extends InitialNodesPropertyTree>(
  initialTree: T,
): NodesPropertyTree => ({
  nodes: keys(initialTree.nodes).reduce((prevNodePositions, key) => {
    const { inputs, outputs, type: propertyKey } = initialTree.nodes[key];

    const inputProperties = keys(inputs).reduce((prevInputs, inputKey) => {
      if (!inputs) return prevInputs;

      const { type, readonly } = inputs[inputKey];

      return {
        ...prevInputs,
        [inputKey]: { type, readonly },
      };
    }, {});

    const outputProperties = keys(outputs).reduce((prevOutputs, outputKey) => {
      if (!outputs) return prevOutputs;

      const { type, readonly } = outputs[outputKey];

      return {
        ...prevOutputs,
        [outputKey]: { type, readonly },
      };
    }, {});

    return {
      ...prevNodePositions,
      [key]: {
        type: propertyKey,
        inputs: inputProperties,
        outputs: outputProperties,
      },
    };
  }, {}),
});

export default setupNodesPropertyTree;
