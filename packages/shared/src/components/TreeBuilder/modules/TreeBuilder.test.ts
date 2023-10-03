import { test, describe, expect } from 'vitest';
import { SerializedTree, TreeBuilder } from '.';

const serializedTree: SerializedTree = {
  editor: {
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
    scale: 0,
  },
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
  test('check to see if tree builder can load property tree', () => {
    const tree = new TreeBuilder(serializedTree, {
      additionalBuilders: ['nodeProperties'],
    });

    const nodePropertyTree = tree.nodePropertyTree?.value;

    expect({
      aInputType: tree.value.nodes.a.inputs.test.type,
      aOutputType: tree.value.nodes.a.outputs.test.type,
      bInputType: tree.value.nodes.b.inputs.test.type,
      bOutputType: tree.value.nodes.b.outputs.test.type,
      aPTreeInputType: nodePropertyTree?.nodes.a.inputs.test.type,
      aPTreeOutputType: nodePropertyTree?.nodes.a.outputs.test.type,
      bPTreeInputType: nodePropertyTree?.nodes.b.inputs.test.type,
      bPTreeOutputType: nodePropertyTree?.nodes.b.outputs.test.type,
    }).toStrictEqual({
      aInputType: 'string',
      aOutputType: `string`,
      bInputType: `string`,
      bOutputType: `string`,
      aPTreeInputType: `string`,
      aPTreeOutputType: `string`,
      bPTreeInputType: `string`,
      bPTreeOutputType: `string`,
    });
  });
  test('check to see if tree builder can load editor position tree', () => {
    const tree = new TreeBuilder(serializedTree, {
      additionalBuilders: ['editorPosition'],
    });

    const editorPositionTree = tree.editorPositionTree?.value;

    expect({
      position: tree.value.editor,
      pTreePosition: editorPositionTree?.editor,
    }).toStrictEqual({
      position: serializedTree.editor,
      pTreePosition: serializedTree.editor,
    });
  });
});
