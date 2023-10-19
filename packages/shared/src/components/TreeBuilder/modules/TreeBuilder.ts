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
import {
  EditorPositionTree,
  EditorPositionTreeBuilder,
  SerializedEditorPositionTree,
} from '@/components/EditorPositionTreeBuilder';
import {
  NodesPositionTree,
  NodesPositionTreeBuilder,
  SerializedNodesPositionTree,
} from '@/components/NodesPositionTreeBuilder';
import {
  NodesComponentTree,
  NodesComponentTreeBuilder,
  SerializedNodesComponentTree,
} from '@/components/NodesComponentTreeBuilder';
import {
  NodesValidatorTreeBuilder,
  SerializedNodesValidatorTree,
} from '@/components/NodesValidatorTreeBuilder';

export type SerializedTree = SerializedNodesOutputsTree &
  SerializedNodesInputsTree &
  SerializedNodesPropertyTree &
  SerializedEditorPositionTree &
  SerializedNodesPositionTree;

export type SerializedTreeWithBlueprintData = SerializedTree &
  SerializedNodesComponentTree &
  SerializedNodesValidatorTree;

export type Tree = [
  NodesOutputsTree,
  NodesInputsTree,
  NodesComponentTree,
  // Anything beyond here is a partial since it may not be loaded
  DeepPartial<NodesPropertyTree>,
  DeepPartial<EditorPositionTree>,
  DeepPartial<NodesPositionTree>,
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
    serializedTree: SerializedTreeWithBlueprintData,
    params?: TreeBuilderParams,
  ) {
    // Tree must always include outputs, inputs, & components
    const outputTree = new NodesOutputsTreeBuilder(serializedTree);
    const inputTree = new NodesInputsTreeBuilder(serializedTree, outputTree);
    const nodesComponentTree = new NodesComponentTreeBuilder(serializedTree);

    let nodesPropertyTree: NodesPropertyTreeBuilder | undefined;
    let editorPositionTree: EditorPositionTreeBuilder | undefined;
    let nodesPositionTree: NodesPositionTreeBuilder | undefined;
    let nodesValidatorTree: NodesValidatorTreeBuilder | undefined;

    // Load any other specified builder
    const additionalTrees =
      params?.additionalBuilders?.map((builder) => {
        switch (builder) {
          case 'nodeProperties':
            nodesPropertyTree = new NodesPropertyTreeBuilder(serializedTree);
            return nodesPropertyTree;
          case 'editorPosition':
            editorPositionTree = new EditorPositionTreeBuilder(serializedTree);
            return editorPositionTree;
          case 'nodesPosition':
            nodesPositionTree = new NodesPositionTreeBuilder(serializedTree);
            return nodesPositionTree;
          case 'nodesValidator':
            nodesValidatorTree = new NodesValidatorTreeBuilder(
              serializedTree,
              serializedTree,
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
