import { UnifiedObservable } from '@/components/Observable';
import {
  SerializedNodesInputsTree,
  NodesInputsTreeBuilder,
  NodesInputsTree,
} from '@/components/NodesInputsTreeBuilder';
import {
  NodesOutputsTree,
  NodesOutputsTreeBuilder,
  SerializedNodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';
import { DeepPartial, OneOfEach } from '@/types';
import {
  NodesPropertyTree,
  NodesPropertyTreeBuilder,
  SerializedNodesPropertyTree,
} from '@/components/NodesPropertyTreeBuilder';

export type SerializedTree = SerializedNodesOutputsTree &
  SerializedNodesInputsTree &
  SerializedNodesPropertyTree;

export type Tree = [
  NodesOutputsTree,
  NodesInputsTree,
  // Anything beyond here is a partial since it may not be loaded
  DeepPartial<NodesPropertyTree>,
];

export type TreeBuilderKeys = OneOfEach<'nodeProperties'>;

export type TreeBuilderParams = {
  additionalBuilders?: TreeBuilderKeys;
};

export default class TreeBuilder extends UnifiedObservable<Tree> {
  public outputTree: NodesOutputsTreeBuilder;
  public inputTree: NodesInputsTreeBuilder;

  public nodePropertyTree?: NodesPropertyTreeBuilder;

  constructor(serializedTree: SerializedTree, params?: TreeBuilderParams) {
    // Tree must always include outputs & inputs
    const outputTree = new NodesOutputsTreeBuilder(serializedTree);
    const inputTree = new NodesInputsTreeBuilder(serializedTree, outputTree);

    // Load any other specified builder
    const additionalTrees =
      params?.additionalBuilders?.map((builder) => {
        switch (builder) {
          case 'nodeProperties':
            return new NodesPropertyTreeBuilder(serializedTree);
          default:
            throw new Error(
              'An unknown tree builder was given to param "additionalBuilders"',
            );
        }
      }) ?? [];

    // @ts-expect-error Additional trees cannot be spread as an array, even if the type signature
    // is correct
    super(outputTree, inputTree, ...additionalTrees);

    this.outputTree = outputTree;
    this.inputTree = inputTree;
  }
}
