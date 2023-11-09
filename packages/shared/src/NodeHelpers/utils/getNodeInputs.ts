import { Input } from '@shared/InputBuilder';
import { NodesInputsTree } from '@shared/NodesInputsTreeBuilder';
import { Observable } from '@shared/Observable';

const getNodeInput = (
  tree: NodesInputsTree,
  nodeId: string,
  inputId: string,
): Observable<Input<unknown>> | undefined => {
  const treeNodes = tree.nodes[nodeId];

  if (!treeNodes) {
    return undefined;
  }

  const nodeInput = treeNodes.inputs[inputId];

  if (!nodeInput) {
    return undefined;
  }

  return nodeInput;
};

export default getNodeInput;
