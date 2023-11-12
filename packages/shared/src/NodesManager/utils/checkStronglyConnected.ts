import keys from 'lodash/keys';
import isNil from 'lodash/isNil';
import { InitialNodesInputsTree } from '@shared/NodesInputsTreeBuilder';
import { InitialInput } from '@shared/InputBuilder';

type InitialNodesInputsTreeWithVisits = InitialNodesInputsTree & {
  nodes: Record<
    string,
    {
      visited?: boolean;
    }
  >;
};

const checkStronglyConnected = (
  entryInputId: string,
  { nodes }: InitialNodesInputsTreeWithVisits,
): boolean => {
  const traversalLog: boolean[] = [];

  const traverseInputTree = (entryNodeId: string) => {
    if (nodes[entryNodeId].visited) return false;

    const inputs = keys(nodes[entryNodeId].inputs)
      .map((inputKey) => nodes[entryNodeId].inputs?.[inputKey])
      .filter((input): input is InitialInput => !!input);

    const mappedInputs = inputs
      .filter((input) => !!input)
      .filter(({ connection: incomingConnection }, index, self) => {
        if (!incomingConnection) return true;

        const { nodeId: incomingNodeId, outputId: incomingOutputId } =
          incomingConnection;

        return (
          index ===
          self.findIndex(({ connection }) => {
            if (!connection) return true;
            const { nodeId, outputId } = connection;

            return nodeId === incomingNodeId && outputId === incomingOutputId;
          })
        );
      });

    // eslint-disable-next-line no-param-reassign
    nodes[entryNodeId].visited = true;

    if (mappedInputs.every((input) => !isNil(input))) {
      mappedInputs.forEach((input) => {
        const incomingConnection = input?.connection;

        if (incomingConnection) {
          const { nodeId } = incomingConnection;
          traversalLog.push(traverseInputTree(nodeId));
        }
      });
    }

    return traversalLog.every((value) => value === true);
  };

  return traverseInputTree(entryInputId);
};

export default checkStronglyConnected;
