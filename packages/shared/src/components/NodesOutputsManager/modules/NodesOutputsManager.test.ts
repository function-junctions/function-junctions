import { beforeEach, describe, expect, test } from 'vitest';
import {
  NodesOutputsTreeBuilder,
  SerializedNodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';
import NodesOutputsManager from './NodesOutputsManager';
import {
  NodesInputsTreeBuilder,
  SerializedNodesInputsTree,
} from '@/components/NodesInputsTreeBuilder';

const outputsTree: SerializedNodesOutputsTree = {
  nodes: {
    a: {
      outputs: {
        string: {
          value: `Hello!`,
        },
      },
    },
    c: {
      outputs: {
        outputIdC: {
          value: `Hello again!`,
        },
      },
    },
  },
};

const inputsTree: SerializedNodesInputsTree = {
  nodes: {
    a: {
      inputs: {
        inputIdA: {
          connection: {
            nodeId: `c`,
            outputId: `outputIdC`,
          },
        },
      },
    },
  },
};

describe('Nodes output manager', () => {
  let outputs: NodesOutputsTreeBuilder;
  let inputs: NodesInputsTreeBuilder;
  let manager: NodesOutputsManager;

  beforeEach(() => {
    outputs = new NodesOutputsTreeBuilder(outputsTree);
    inputs = new NodesInputsTreeBuilder(inputsTree, outputs);
    manager = new NodesOutputsManager(outputs, inputs);
  });

  test('check to see if new node can be created', () => {
    manager.createOutput('b', {
      id: 'string',
      value: 'Hello!',
    });

    expect(outputs.value.nodes.b.outputs.string.value).toBe('Hello!');
  });

  test('check to see if new node respects existing nodes', () => {
    expect(() =>
      manager.createOutput('a', {
        id: 'string',
        value: 'Overwritten!',
      }),
    ).toThrowError();
  });

  test.skip('check that deleting an output that does not exist does nothing', () => {
    manager.deleteOutput('a', 'notExistingOutput');

    expect(outputs.value.nodes.a.outputs.string.value).toBe('Hello!');
    expect(inputs.value.nodes.a.inputs.inputIdA.value.connection).toEqual({
      nodeId: `c`,
      outputId: `outputIdC`,
    });
    expect(outputs.value.nodes.c.outputs.outputIdC.value).toBe('Hello again!');
  });

  test.skip('check if an output is deleted from a node with no references to the output', () => {
    manager.deleteOutput('a', 'string');

    // a's output should be deleted
    expect(outputs.value.nodes.a.outputs.string).toBeUndefined();
    // other nodes should not be affected
    expect(outputs.value.nodes.c.outputs.outputIdC.value).toBe('Hello again!');
    expect(inputs.value.nodes.a.inputs.inputIdA.value.connection).toEqual({
      nodeId: `c`,
      outputId: `outputIdC`,
    });
  });

  test.skip('check if an output and input references to the output are removed', () => {
    // c's output is referenced by a's input
    manager.deleteOutput('c', 'outputIdC');

    expect(outputs.value.nodes.c.outputs.outputIdC).toBeUndefined();
    expect(
      inputs.value.nodes.a.inputs.inputIdA.value.connection,
    ).toBeUndefined();
  });
});
