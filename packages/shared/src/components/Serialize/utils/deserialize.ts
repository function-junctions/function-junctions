/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  StatefulNode,
  StatefulNodeTree,
} from '@/components/Tree/utils/TreeBuilder';
import { SerializedNode, SerializedNodeTree } from '.';
import {
  InputSocket,
  OutputSocket,
  SerializedInputSocket,
  SerializedOutputSocket,
} from '@/components/IO';

export const deserializeNodeInput = (
  node: SerializedInputSocket,
): InputSocket<unknown> => ({}) as InputSocket<unknown>;

export const deserializeNodeOutput = (
  node: SerializedOutputSocket,
): OutputSocket<unknown> => ({}) as OutputSocket<unknown>;

export const deserializeNode = (node: SerializedNode): StatefulNode =>
  ({}) as StatefulNode;

export const deserializeNodes = (nodes: SerializedNodeTree): StatefulNodeTree =>
  ({}) as StatefulNodeTree;
