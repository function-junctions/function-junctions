import { NodesBlueprint as SharedNodesBlueprint } from '@function-junctions/shared';
import { NodeProps } from '@react/Node';
import { ReactElement } from 'react';

export type NodesBlueprintComponent = (props: NodeProps) => ReactElement;
export type NodeBlueprintHook = (props: NodeProps) => void;

export type NodesBlueprint = SharedNodesBlueprint<
  NodesBlueprintComponent | NodeBlueprintHook
>;
