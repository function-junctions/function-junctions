import { beforeAll, describe, expect, test } from 'vitest';
import {
  NodesInputsTreeBuilder,
  SerializedNodesInputsTree,
} from '@/components/NodesInputsTreeBuilder';
import {
  NodesOutputsTreeBuilder,
  SerializedNodesOutputsTree,
} from '@/components/NodesOutputsTreeBuilder';
import NodesManager from './NodesManager';
import {
  NodesPropertyTreeBuilder,
  SerializedNodesPropertyTree,
} from '@/components/NodesPropertyTreeBuilder';
import {
  NodesValidatorTreeBuilder,
  SerializedNodesValidatorTree,
} from '@/components/NodesValidatorTreeBuilder';

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

const propertyTree: SerializedNodesPropertyTree = {
  nodes: {
    a: {
      type: 'test',
      inputs: {
        string: {
          type: 'string',
        },
      },
    },
    b: {
      type: 'test',
      inputs: {
        string: {
          type: 'string',
        },
      },
    },
    c: {
      type: 'test',
      inputs: {
        string: {
          type: 'string',
        },
      },
    },
    d: {
      type: 'test',
      inputs: {
        string: {
          type: 'string',
        },
      },
    },
  },
};

const validatorTree: SerializedNodesValidatorTree = {
  nodes: {
    c: {
      inputs: {
        string: {
          validator: () => false,
        },
      },
    },
  },
};

describe('Nodes manager', () => {
  let outputs: NodesOutputsTreeBuilder;
  let inputs: NodesInputsTreeBuilder;
  let properties: NodesPropertyTreeBuilder;
  let validator: NodesValidatorTreeBuilder;

  beforeAll(() => {
    outputs = new NodesOutputsTreeBuilder(outputsTree);
    inputs = new NodesInputsTreeBuilder(inputsTree, outputs);
    properties = new NodesPropertyTreeBuilder(propertyTree);
    validator = new NodesValidatorTreeBuilder(validatorTree, propertyTree);
  });

  test('check to see if two nodes can connect', () => {
    const manager = new NodesManager({
      inputTree: inputs,
      outputTree: outputs,
      propertyTree: properties,
      validatorTree: validator,
    });

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
    const manager = new NodesManager({
      inputTree: inputs,
      outputTree: outputs,
      propertyTree: properties,
      validatorTree: validator,
    });

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
    const manager = new NodesManager({
      inputTree: inputs,
      outputTree: outputs,
      propertyTree: properties,
      validatorTree: validator,
    });

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
