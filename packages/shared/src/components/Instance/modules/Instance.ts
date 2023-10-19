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
  defaultConnection?: SerializedInputConnection;
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
> {
  public tree: TreeBuilder;
  public api?: NodesManager;

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

    if (tree.nodesValidatorTree && tree.nodesPropertyTree)
      this.api = new NodesManager({
        inputTree: tree.inputTree,
        outputTree: tree.outputTree,
        validatorTree: tree.nodesValidatorTree,
        propertyTree: tree.nodesPropertyTree,
      });

    this.tree = tree;
  }
}
