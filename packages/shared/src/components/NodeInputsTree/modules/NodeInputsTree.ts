import { Observable } from '@/components';
import { OutputSocket } from '@/components/Output';

type SerializedNodeInputsTree = Record<string, OutputSocket<unknown>>;

type SerializedNodesInputsTree = Record<string, SerializedNodeInputsTree>;

export default class NodeInputsTree<
  T extends SerializedNodesInputsTree = SerializedNodesInputsTree,
> extends Observable<T> {}
