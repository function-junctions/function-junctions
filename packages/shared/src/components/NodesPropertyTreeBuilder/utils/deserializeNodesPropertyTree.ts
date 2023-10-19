import keys from 'lodash/keys';
import {
  SerializedNodesPropertyTree,
  NodesPropertyTree,
} from '@/components/NodesPropertyTreeBuilder';

const deserializeNodesPropertyTree = <T extends SerializedNodesPropertyTree>(
  serializedTree: T,
): NodesPropertyTree => ({
  nodes: keys(serializedTree.nodes).reduce((prevNodePositions, key) => {
    const { inputs, outputs, type: propertyKey } = serializedTree.nodes[key];

    const inputProperties = keys(inputs).reduce((prevInputs, inputKey) => {
      const { type, readonly } = inputs[inputKey];

      return {
        ...prevInputs,
        [inputKey]: { type, readonly },
      };
    }, {});

    const outputProperties = keys(outputs).reduce((prevOutputs, outputKey) => {
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

export default deserializeNodesPropertyTree;
