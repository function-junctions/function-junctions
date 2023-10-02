import { test, describe, expect } from 'vitest';
import { SerializedTree, TreeBuilder } from '.';

const serializedTree: SerializedTree = {
  nodes: {
    a: {
      inputs: {
        test: {
          type: 'string',
        },
      },
      outputs: {
        test: {
          type: 'string',
          value: 'hello!',
        },
      },
    },
    b: {
      inputs: {
        test: {
          type: 'string',
          connection: {
            nodeId: 'a',
            outputId: 'test',
          },
        },
      },
      outputs: {
        test: {
          type: 'string',
          value: 'hello again!',
        },
      },
    },
  },
};

describe('Tree Builder', () => {
  test('check to see if tree builder can load default trees', () => {
    const tree = new TreeBuilder(serializedTree);

    expect({
      aInput: tree.value.nodes.a.inputs.test.value.connection,
      aOutput: tree.value.nodes.a.outputs.test.value,
      bInput: tree.value.nodes.b.inputs.test.value.connection,
      bOutput: tree.value.nodes.b.outputs.test.value,
    }).toStrictEqual({
      aInput: undefined,
      aOutput: `hello!`,
      bInput: {
        nodeId: 'a',
        outputId: 'test',
      },
      bOutput: `hello again!`,
    });
  });
  test('check to see if tree builder can load additional trees', () => {
    const tree = new TreeBuilder(serializedTree, {
      additionalBuilders: ['nodeProperties'],
    });

    expect({
      aInput: tree.value.nodes.a.inputs.test.type,
      aOutput: tree.value.nodes.a.outputs.test.type,
      bInput: tree.value.nodes.b.inputs.test.type,
      bOutput: tree.value.nodes.b.outputs.test.type,
    }).toStrictEqual({
      aInput: 'string',
      aOutput: `string`,
      bInput: `string`,
      bOutput: `string`,
    });
  });
});
