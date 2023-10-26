import { UnifiedObservable } from '@/modules/Observable';
import {
  InitialNodesInputsTree,
  NodesInputsTreeBuilder,
  NodesInputsTree,
} from '@/modules/NodesInputsTreeBuilder';
import {
  NodesOutputsTree,
  NodesOutputsTreeBuilder,
  InitialNodesOutputsTree,
} from '@/modules/NodesOutputsTreeBuilder';
import { DeepPartial, OneOfEach } from '@/types';
import {
  NodesPropertyTree,
  NodesPropertyTreeBuilder,
  InitialNodesPropertyTree,
} from '@/modules/NodesPropertyTreeBuilder';
import {
  EditorPositionTree,
  EditorPositionTreeBuilder,
  InitialEditorPositionTree,
} from '@/EditorPositionTreeBuilder';
import {
  NodesPositionTree,
  NodesPositionTreeBuilder,
  InitialNodesPositionTree,
} from '@/modules/NodesPositionTreeBuilder';
import {
  NodesComponentTree,
  NodesComponentTreeBuilder,
  InitialNodesComponentTree,
} from '@/modules/NodesComponentTreeBuilder';
import {
  NodesValidatorTreeBuilder,
  InitialNodesValidatorTree,
  NodesValidatorTree,
} from '@/modules/NodesValidatorTreeBuilder';

export type InitialTree = InitialNodesOutputsTree &
  InitialNodesInputsTree &
  InitialNodesPropertyTree &
  InitialEditorPositionTree &
  InitialNodesPositionTree;

export type InitialTreeWithBlueprintData = InitialTree &
  InitialNodesComponentTree &
  InitialNodesValidatorTree;

export type Tree = [
  NodesOutputsTree,
  NodesInputsTree,
  NodesComponentTree,
  // Anything beyond here is a partial since it may not be loaded
  DeepPartial<NodesPropertyTree>,
  DeepPartial<EditorPositionTree>,
  DeepPartial<NodesPositionTree>,
  DeepPartial<NodesComponentTree>,
  DeepPartial<NodesValidatorTree>,
];

export type TreeBuilderKeys = OneOfEach<
  | 'nodeProperties'
  | 'editorPosition'
  | 'nodesPosition'
  | 'nodesComponent'
  | 'nodesValidator'
>;

export type TreeBuilderParams = {
  additionalBuilders?: TreeBuilderKeys;
};

export default class TreeBuilder extends UnifiedObservable<Tree> {
  public outputTree: NodesOutputsTreeBuilder;
  public inputTree: NodesInputsTreeBuilder;

  public nodesPropertyTree?: NodesPropertyTreeBuilder;
  public editorPositionTree?: EditorPositionTreeBuilder;
  public nodesPositionTree?: NodesPositionTreeBuilder;
  public nodesComponentTree?: NodesComponentTreeBuilder;
  public nodesValidatorTree?: NodesValidatorTreeBuilder;

  constructor(
    initialTree: InitialTreeWithBlueprintData,
    params?: TreeBuilderParams,
  ) {
    // Tree must always include outputs, inputs, & components
    const outputTree = new NodesOutputsTreeBuilder(initialTree);
    const inputTree = new NodesInputsTreeBuilder(initialTree, outputTree);
    const nodesComponentTree = new NodesComponentTreeBuilder(initialTree);

    let nodesPropertyTree: NodesPropertyTreeBuilder | undefined;
    let editorPositionTree: EditorPositionTreeBuilder | undefined;
    let nodesPositionTree: NodesPositionTreeBuilder | undefined;
    let nodesValidatorTree: NodesValidatorTreeBuilder | undefined;

    // Load any other specified builder
    const additionalTrees =
      params?.additionalBuilders?.map((builder) => {
        switch (builder) {
          case 'nodeProperties':
            nodesPropertyTree = new NodesPropertyTreeBuilder(initialTree);
            return nodesPropertyTree;
          case 'editorPosition':
            editorPositionTree = new EditorPositionTreeBuilder(initialTree);
            return editorPositionTree;
          case 'nodesPosition':
            nodesPositionTree = new NodesPositionTreeBuilder(initialTree);
            return nodesPositionTree;
          case 'nodesValidator':
            nodesValidatorTree = new NodesValidatorTreeBuilder(
              initialTree,
              initialTree,
            );
            return nodesValidatorTree;
          default:
            throw new Error(
              'An unknown tree builder was given to param "additionalBuilders"',
            );
        }
      }) ?? [];

    // @ts-expect-error Additional trees cannot be spread as an array, even if the type signature
    // is correct
    super(outputTree, inputTree, nodesComponentTree, ...additionalTrees);

    this.outputTree = outputTree;
    this.inputTree = inputTree;
    this.nodesComponentTree = nodesComponentTree;

    this.nodesPropertyTree = nodesPropertyTree;
    this.editorPositionTree = editorPositionTree;
    this.nodesPositionTree = nodesPositionTree;
    this.nodesValidatorTree = nodesValidatorTree;
  }
}
