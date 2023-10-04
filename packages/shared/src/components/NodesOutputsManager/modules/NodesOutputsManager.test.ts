import { describe, expect, test } from 'vitest';
import {
  NodesOutputsTreeBuilder,
  SerializedNodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';
import { NodesOutputsManager } from '.';

const outputsTree: SerializedNodesOutputsTree = {
  nodes: {
    a: {
      outputs: {
        string: {
          value: `Hello!`,
        },
      },
    },
  },
};

describe('Nodes output manager', () => {
  test('check to see if new node can be created', () => {
    const outputs = new NodesOutputsTreeBuilder(outputsTree);
    const manager = new NodesOutputsManager(outputs);

    manager.createOutput('b', {
      id: 'string',
      value: 'Hello!',
    });

    expect(outputs.value.nodes.b.outputs.string.value).toBe('Hello!');
  });
  test('check to see if new node respects existing nodes', () => {
    const outputs = new NodesOutputsTreeBuilder(outputsTree);
    const manager = new NodesOutputsManager(outputs);

    expect(() =>
      manager.createOutput('a', {
        id: 'string',
        value: 'Overwritten!',
      }),
    ).toThrowError();
  });
});
