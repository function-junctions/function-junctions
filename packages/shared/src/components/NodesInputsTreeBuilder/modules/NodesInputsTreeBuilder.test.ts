import { describe, expect, test } from 'vitest';
import { NodesOutputsTreeBuilder } from '@/components/NodesOutputsTreeBuilder';
import NodesInputsTreeBuilder from './NodesInputsTreeBuilder';

const outputTree = {
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
};

const inputsTree = {
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
};

const outputs = new NodesOutputsTreeBuilder<typeof outputTree>(outputTree);

describe('Nodes Inputs Tree', () => {
  test('See if node input connections properly update', () => {
    const inputs = new NodesInputsTreeBuilder<typeof inputsTree>(
      inputsTree,
      // @ts-expect-error fix this later
      outputs,
    );

    const { connection } = inputs.value.c.inputs.string.value;
    if (connection) connection.nodeId = `b`;

    expect(inputs.value.c.inputs.string.value.value).toStrictEqual({
      value: `Hello again!`,
    });
  });
});
