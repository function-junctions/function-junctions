import { SerializedInputConnection } from '@/components/InputBuilder';
import { NodesManager } from '@/components/NodesManager';
import { SerializedIOPropertyTree } from '@/components/NodesPropertyTreeBuilder';
import { SerializedOutput } from '@/components/Output';
import {
  SerializedTree,
  TreeBuilder,
  TreeBuilderKeys,
  SerializedTreeWithBlueprintData,
} from '@/components/TreeBuilder';
import { mergeBlueprintData } from '@/components/Instance';

export type IOBlueprint = {
  type: string;
};

export type OutputBlueprint<T = unknown> = IOBlueprint & {
  defaultValue?: T;
};

export type InputBlueprint = IOBlueprint & {
  connection?: SerializedInputConnection;
  validator?: (
    incomingOutput: SerializedOutput<unknown> & SerializedIOPropertyTree,
  ) => boolean;
};

export type NodeBlueprint<TComponent = unknown> = {
  outputs?: Record<string, OutputBlueprint>;
  inputs?: Record<string, InputBlueprint>;
  component: TComponent;
};

export type NodesBlueprint = Record<string, NodeBlueprint>;

export type InstanceParams<
  TBlueprint extends NodesBlueprint,
  TSerializedTree extends SerializedTree = SerializedTree,
> = {
  blueprint: TBlueprint;
  tree?: TSerializedTree;

  additionalTreeBuilders?: TreeBuilderKeys;
};

export default class Instance<
  TBlueprint extends NodesBlueprint = NodesBlueprint,
  TSerializedTree extends SerializedTree = SerializedTree,
> extends NodesManager {
  public blueprint: TBlueprint;
  public tree: TreeBuilder;

  constructor({
    blueprint,
    tree: defaultTree,
    additionalTreeBuilders,
  }: InstanceParams<TBlueprint, TSerializedTree>) {
    const initalTree: SerializedTreeWithBlueprintData = {
      nodes: {},
    };

    const tree = new TreeBuilder(
      mergeBlueprintData(blueprint, defaultTree ?? initalTree),
      {
        additionalBuilders: additionalTreeBuilders,
      },
    );

    super(tree.inputTree, tree.outputTree);

    this.blueprint = blueprint;
    this.tree = tree;
  }
}
