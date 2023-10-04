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
      x: 0,
      y: 0,
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
      x: 0,
      y: 0,
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

    const aType = {
      inputs: {
        test: {
          readonly: undefined,
          type: tree.value.nodes.a.inputs.test.type,
        },
      },
      outputs: {
        test: {
          readonly: undefined,
          type: tree.value.nodes.a.outputs.test.type,
        },
      },
    };

    const bType = {
      inputs: {
        test: {
          readonly: undefined,
          type: tree.value.nodes.b.inputs.test.type,
        },
      },
      outputs: {
        test: {
          readonly: undefined,
          type: tree.value.nodes.b.outputs.test.type,
        },
      },
    };

    const expectedNode = {
      inputs: {
        test: {
          readonly: undefined,
          type: 'string',
        },
      },
      outputs: {
        test: {
          readonly: undefined,
          type: 'string',
        },
      },
    };

    expect({
      aType,
      bType,
      aPTreeType: nodePropertyTree?.nodes.a,
      bPTreeType: nodePropertyTree?.nodes.b,
    }).toStrictEqual({
      aType: expectedNode,
      bType: expectedNode,
      aPTreeType: expectedNode,
      bPTreeType: expectedNode,
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
  test('check to see if tree builder can load nodes position tree', () => {
    const tree = new TreeBuilder(serializedTree, {
      additionalBuilders: ['nodesPosition'],
    });

    const nodesPositionTree = tree.nodesPositionTree?.value;

    expect({
      aPosition: { x: tree.value.nodes.a.x, y: tree.value.nodes.a.y },
      aPTreePosition: nodesPositionTree?.nodes.a,
      bPosition: { x: tree.value.nodes.b.x, y: tree.value.nodes.b.y },
      bPTreePosition: nodesPositionTree?.nodes.b,
    }).toStrictEqual({
      aPosition: {
        x: 0,
        y: 0,
      },
      aPTreePosition: {
        x: 0,
        y: 0,
      },
      bPosition: {
        x: 0,
        y: 0,
      },
      bPTreePosition: {
        x: 0,
        y: 0,
      },
    });
  });
});
