import { describe, expect, test } from 'vitest';
import { NodesOutputsTreeBuilder } from '@shared/NodesOutputsTreeBuilder';
import NodesInputsTreeBuilder from './NodesInputsTreeBuilder';

const outputTree = {
  nodes: {
    a: {
      outputs: {
        string: {
          value: `Hello!`,
        },
      },
    },
    b: {
      outputs: {
        string: {
          value: `Hello again!`,
        },
      },
    },
  },
};

const inputsTree = {
  nodes: {
    c: {
      inputs: {
        string: {
          connection: {
            nodeId: `a`,
            outputId: `string`,
          },
        },
      },
    },
  },
};

const outputs = new NodesOutputsTreeBuilder(outputTree);

describe('Nodes Inputs Tree', () => {
  test('See if node input connections properly update', () => {
    const inputs = new NodesInputsTreeBuilder(inputsTree, outputs);

    const { connection } = inputs.value.nodes.c.inputs.string.value;
    if (connection) connection.nodeId = `b`;

    expect(inputs.value.nodes.c.inputs.string.value.value).toStrictEqual(
      `Hello again!`,
    );
  });

  test('See if origin node input connection properly updates connected node', () => {
    const inputs = new NodesInputsTreeBuilder(inputsTree, outputs);

    outputs.value.nodes.a.outputs.string.value = `Hello again!`;

    expect(inputs.value.nodes.c.inputs.string.value.value).toStrictEqual(
      `Hello again!`,
    );
  });
});
