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

export type SerializedTree = SerializedNodesOutputsTree &
  SerializedNodesInputsTree &
  SerializedNodesPropertyTree &
  SerializedEditorPositionTree &
  SerializedNodesPositionTree;

export type Tree = [
  NodesOutputsTree,
  NodesInputsTree,
  // Anything beyond here is a partial since it may not be loaded
  DeepPartial<NodesPropertyTree>,
  DeepPartial<EditorPositionTree>,
  DeepPartial<NodesPositionTree>,
];

export type TreeBuilderKeys = OneOfEach<
  'nodeProperties' | 'editorPosition' | 'nodesPosition'
>;

export type TreeBuilderParams = {
  additionalBuilders?: TreeBuilderKeys;
};

export default class TreeBuilder extends UnifiedObservable<Tree> {
  public outputTree: NodesOutputsTreeBuilder;
  public inputTree: NodesInputsTreeBuilder;

  public nodePropertyTree?: NodesPropertyTreeBuilder;
  public editorPositionTree?: EditorPositionTreeBuilder;
  public nodesPositionTree?: NodesPositionTreeBuilder;

  constructor(serializedTree: SerializedTree, params?: TreeBuilderParams) {
    // Tree must always include outputs & inputs
    const outputTree = new NodesOutputsTreeBuilder(serializedTree);
    const inputTree = new NodesInputsTreeBuilder(serializedTree, outputTree);

    let nodePropertyTree: NodesPropertyTreeBuilder | undefined;
    let editorPositionTree: EditorPositionTreeBuilder | undefined;
    let nodesPositionTree: NodesPositionTreeBuilder | undefined;

    // Load any other specified builder
    const additionalTrees =
      params?.additionalBuilders?.map((builder) => {
        switch (builder) {
          case 'nodeProperties':
            nodePropertyTree = new NodesPropertyTreeBuilder(serializedTree);
            return nodePropertyTree;
          case 'editorPosition':
            editorPositionTree = new EditorPositionTreeBuilder(serializedTree);
            return editorPositionTree;
          case 'nodesPosition':
            nodesPositionTree = new NodesPositionTreeBuilder(serializedTree);
            return nodesPositionTree;
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

    this.nodePropertyTree = nodePropertyTree;
    this.editorPositionTree = editorPositionTree;
    this.nodesPositionTree = nodesPositionTree;
  }
}
