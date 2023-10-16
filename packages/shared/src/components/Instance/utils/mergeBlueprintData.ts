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
          const componentKey = serializedTree.nodes[nodeKey].key;

          return {
            ...prevTree,
            [nodeKey]: {
              component: components[componentKey],
            },
          };
        },
        {} as Record<string, SerializedNodeComponentTree>,
      ),
    ),
  };
};

export default mergeBlueprintData;
