import { describe, expect, test } from 'vitest';
import {
  NodesInputsTreeBuilder,
  SerializedNodesInputsTree,
} from '@/components/NodesInputsTreeBuilder';
import {
  NodesOutputsTreeBuilder,
  SerializedNodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';
import NodesManager from './NodesManager';

const outputsTree: SerializedNodesOutputsTree = {
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
    c: {
      outputs: {
        string: {
          value: `Hello again again!`,
        },
      },
    },
  },
};

const inputsTree: SerializedNodesInputsTree = {
  nodes: {
    a: {
      inputs: {
        string: {
          connection: undefined,
        },
      },
    },
    b: {
      inputs: {
        string: {
          connection: {
            nodeId: `a`,
            outputId: `string`,
          },
        },
      },
    },
    c: {
      inputs: {
        string: {
          connection: {
            nodeId: `b`,
            outputId: `string`,
          },
        },
      },
    },
    d: {
      inputs: {
        string: {
          connection: undefined,
        },
      },
    },
  },
};

describe('Nodes manager', () => {
  test('check to see if two nodes can connect', () => {
    const outputs = new NodesOutputsTreeBuilder(outputsTree);
    const inputs = new NodesInputsTreeBuilder(inputsTree, outputs);

    const manager = new NodesManager(inputs, outputs);

    manager.connect(
      {
        nodeId: 'd',
        inputId: 'string',
      },
      {
        nodeId: 'a',
        outputId: 'string',
      },
    );

    expect(inputs.value.nodes.d.inputs.string.value.value).toBe(`Hello!`);
  });
  test('check to see if a node connected to itself throws an exception', () => {
    const outputs = new NodesOutputsTreeBuilder(outputsTree);
    const inputs = new NodesInputsTreeBuilder(inputsTree, outputs);

    const manager = new NodesManager(inputs, outputs);

    expect(() =>
      manager.connect(
        {
          nodeId: 'a',
          inputId: 'string',
        },
        {
          nodeId: 'a',
          outputId: 'string',
        },
      ),
    ).toThrowError(`You cannot connect a node to itself`);
  });

  test('check to see if connected nodes respects a strong connection', () => {
    const outputs = new NodesOutputsTreeBuilder(outputsTree);
    const inputs = new NodesInputsTreeBuilder(inputsTree, outputs);

    const manager = new NodesManager(inputs, outputs);

    manager.connect(
      {
        nodeId: 'a',
        inputId: 'string',
      },
      {
        nodeId: 'c',
        outputId: 'string',
      },
    );

    expect(inputs.value.nodes.d.inputs.string.value.value).toBe(undefined);
  });
});
