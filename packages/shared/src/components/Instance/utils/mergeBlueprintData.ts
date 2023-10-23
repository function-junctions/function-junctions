import merge from 'lodash/merge';
import keys from 'lodash/keys';
import {
  SerializedTree,
  SerializedTreeWithBlueprintData,
} from '@/components/TreeBuilder';
import { NodesBlueprint } from '@/components/Instance';
import { SerializedNodeComponentTree } from '@/components/NodesComponentTreeBuilder';

const mergeBlueprintData = (
  blueprint: NodesBlueprint,
  serializedTree: SerializedTree,
): SerializedTreeWithBlueprintData => {
  const components = keys(blueprint).reduce(
    (prevComponent, componentKey) => {
      const { component } = blueprint[componentKey];
      return {
        ...prevComponent,
        [componentKey]: component,
      };
    },
    {} as Record<string, unknown>,
  );

  return {
    ...serializedTree,
    nodes: merge(
      serializedTree.nodes,
      keys(serializedTree.nodes).reduce(
        (prevTree, nodeKey) => {
          const blueprintNodeKey = serializedTree.nodes[nodeKey].type;
          const { inputs } = serializedTree.nodes[nodeKey];

          return {
            ...prevTree,
            [nodeKey]: {
              component: components[blueprintNodeKey],
              inputs: keys(inputs).reduce((prevInputs, inputKey) => {
                const input = inputs[inputKey];
                const inputBlueprint =
                  blueprint[blueprintNodeKey].inputBlueprints?.[input.type];

                if (!inputBlueprint) {
                  console.warn(
                    `The input ${inputKey} in node ${nodeKey} does not have a corresponding blueprint.`,
                  );
                  return {
                    ...prevInputs,
                    [inputKey]: input,
                  };
                }

                return {
                  ...prevInputs,
                  [inputKey]: merge(inputBlueprint, input),
                };
              }, {}),
            },
          };
        },
        {} as Record<string, SerializedNodeComponentTree>,
      ),
    ),
  };
};

export default mergeBlueprintData;
