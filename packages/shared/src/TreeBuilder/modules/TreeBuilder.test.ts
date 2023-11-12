import { test, describe, expect } from 'vitest';
import { InitialTreeWithBlueprintData, TreeBuilder } from '.';

const initialTree: InitialTreeWithBlueprintData = {
  editor: {
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
    scale: 0,
  },
  nodes: {
    a: {
      type: 'test',
      x: 0,
      y: 0,
      component: undefined,
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
      type: 'test',
      x: 0,
      y: 0,
      component: undefined,
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
    const tree = new TreeBuilder(initialTree);

    if (
      !tree.value.nodes.a.inputs ||
      !tree.value.nodes.a.outputs ||
      !tree.value.nodes.b.inputs ||
      !tree.value.nodes.b.outputs
    )
      return;

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
    const tree = new TreeBuilder(initialTree, {
      additionalBuilders: ['nodeProperties'],
    });

    const nodesPropertyTree = tree.nodesPropertyTree?.value;

    if (
      !tree.value.nodes.a.inputs ||
      !tree.value.nodes.a.outputs ||
      !tree.value.nodes.b.inputs ||
      !tree.value.nodes.b.outputs
    )
      return;

    const aType = {
      type: 'test',
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
      type: 'test',
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
      type: 'test',
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
      aPTreeType: nodesPropertyTree?.nodes.a,
      bPTreeType: nodesPropertyTree?.nodes.b,
    }).toStrictEqual({
      aType: expectedNode,
      bType: expectedNode,
      aPTreeType: expectedNode,
      bPTreeType: expectedNode,
    });
  });

  test('check to see if tree builder can load editor position tree', () => {
    const tree = new TreeBuilder(initialTree, {
      additionalBuilders: ['editorPosition'],
    });

    const editorPositionTree = tree.editorPositionTree?.value;

    expect({
      position: tree.value.editor,
      pTreePosition: editorPositionTree?.editor,
    }).toStrictEqual({
      position: initialTree.editor,
      pTreePosition: initialTree.editor,
    });
  });
  test('check to see if tree builder can load nodes position tree', () => {
    const tree = new TreeBuilder(initialTree, {
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
