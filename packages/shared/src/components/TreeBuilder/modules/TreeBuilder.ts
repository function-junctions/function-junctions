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

export type SerializedTree = SerializedNodesOutputsTree &
  SerializedNodesInputsTree;

export type Tree = [NodesOutputsTree, NodesInputsTree];

export default class TreeBuilder extends UnifiedObservable<Tree> {
  public outputTree: NodesOutputsTreeBuilder;
  public inputTree: NodesInputsTreeBuilder;

  constructor(serializedTree: SerializedTree) {
    // Tree must always include outputs & inputs
    const outputTree = new NodesOutputsTreeBuilder(serializedTree);
    const inputTree = new NodesInputsTreeBuilder(serializedTree, outputTree);

    super(outputTree, inputTree);

    this.outputTree = outputTree;
    this.inputTree = inputTree;
  }
}
