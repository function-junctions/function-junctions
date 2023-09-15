import { expect, describe, test } from 'vitest';
import { StatefulTree, Tree } from '@/components/Tree';
import Input from './Input';

const defaultType = 'number';
const defaultValue = 1;

const testTree: StatefulTree = {
  nodes: {
    test: {
      inputs: {},
      outputs: {
        test: {
          type: defaultType,
          value: defaultValue,
        },
      },
    },
    test2: {
      inputs: {
        test: {
          type: defaultType,
        },
      },
      outputs: {},
    },
  },
};

describe('input', () => {
  test('value should equal to value of connected id', () => {
    const tree = new Tree(testTree);
    const input = new Input({ type: defaultType }, tree.value);

    input.value.connection = {
      nodeId: `test`,
      outputId: `test`,
    };

    expect(input.value.value).toBe(defaultValue);
  });
});
