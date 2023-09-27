import { Observable } from '@/components';
import { SerializedOutputSocket } from '@/components/Output';
import { deserializeOutputTree } from '..';

export type SerializedNodeOutputsTree = Record<
  string,
  SerializedOutputSocket<unknown>
>;

export type SerializedNodesOutputsTree = Record<
  string,
  SerializedNodeOutputsTree
>;

export default class NodeOutputsTree<
  T extends SerializedNodesOutputsTree = SerializedNodesOutputsTree,
> extends Observable<T> {
  constructor(params: T) {
    const tree = deserializeOutputTree<T>(params);

    super(tree);
  }
}
