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
> extends TreeBuilder {
  public api?: NodesManager;

  constructor({
    blueprint,
    tree: defaultTree,
    additionalTreeBuilders,
  }: InstanceParams<TBlueprint, TSerializedTree>) {
    const initalTree: SerializedTreeWithBlueprintData = {
      nodes: {},
    };

    super(mergeBlueprintData(blueprint, defaultTree ?? initalTree), {
      additionalBuilders: additionalTreeBuilders,
    });

    if (this.nodesValidatorTree && this.nodesPropertyTree)
      this.api = new NodesManager({
        inputTree: this.inputTree,
        outputTree: this.outputTree,
        validatorTree: this.nodesValidatorTree,
        propertyTree: this.nodesPropertyTree,
        blueprint,
      });
  }
}
