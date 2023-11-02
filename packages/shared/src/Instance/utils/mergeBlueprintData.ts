import merge from 'lodash/merge';
import keys from 'lodash/keys';
import { InitialTree, InitialTreeWithBlueprintData } from '@shared/TreeBuilder';
import { NodesBlueprint } from '@shared/Instance';
import { InitialNodeComponentTree } from '@shared/NodesComponentTreeBuilder';

const mergeBlueprintData = (
  blueprint: NodesBlueprint,
  initialTree: InitialTree,
): InitialTreeWithBlueprintData => {
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
    ...initialTree,
    nodes: merge(
      initialTree.nodes,
      keys(initialTree.nodes).reduce(
        (prevTree, nodeKey) => {
          const blueprintNodeKey = initialTree.nodes[nodeKey].type;
          const { inputs } = initialTree.nodes[nodeKey];

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
        {} as Record<string, InitialNodeComponentTree>,
      ),
    ),
  };
};

export default mergeBlueprintData;
