import { NodesManager } from '@shared/NodesManager';
import { InitialIOPropertyTree } from '@shared/NodesPropertyTreeBuilder';
import { InitialOutput } from '@shared/Output';
import {
  InitialTree,
  TreeBuilder,
  TreeBuilderKeys,
  InitialTreeWithBlueprintData,
} from '@shared/TreeBuilder';
import { mergeBlueprintData } from '@shared/Instance';

export type IOBlueprint = {
  type: string;
};

export type OutputBlueprint<T = unknown> = IOBlueprint & {
  defaultValue?: T;
};

export type InputBlueprint = IOBlueprint & {
  validator?: (
    incomingOutput: InitialOutput<unknown> & InitialIOPropertyTree,
  ) => boolean;
};

export type NodeBlueprint<TComponent = unknown> = {
  outputBlueprints?: Record<string, OutputBlueprint>;
  inputBlueprints?: Record<string, InputBlueprint>;
  component: TComponent;
};

export type NodesBlueprint<T = unknown> = Record<string, NodeBlueprint<T>>;

export type InstanceParams<
  TBlueprint extends NodesBlueprint,
  TInitialTree extends InitialTree = InitialTree,
> = {
  blueprint: TBlueprint;
  tree?: TInitialTree;

  additionalTreeBuilders?: TreeBuilderKeys;
};

export default class Instance<
  TBlueprint extends NodesBlueprint = NodesBlueprint,
  TInitialTree extends InitialTree = InitialTree,
> extends TreeBuilder {
  public api?: NodesManager;

  constructor({
    blueprint,
    tree: defaultTree,
    additionalTreeBuilders,
  }: InstanceParams<TBlueprint, TInitialTree>) {
    const initalTree: InitialTreeWithBlueprintData = {
      nodes: {},
    };

    const tree = mergeBlueprintData(blueprint, defaultTree ?? initalTree);

    super(tree, { additionalBuilders: additionalTreeBuilders });

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
