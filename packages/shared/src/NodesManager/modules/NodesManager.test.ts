import { beforeEach, describe, expect, test } from 'vitest';
import {
  NodesInputsTreeBuilder,
  InitialNodesInputsTree,
} from '@shared/NodesInputsTreeBuilder';
import {
  NodesOutputsTreeBuilder,
  InitialNodesOutputsTree,
} from '@shared/NodesOutputsTreeBuilder';
import NodesManager from './NodesManager';
import {
  NodesPropertyTreeBuilder,
  InitialNodesPropertyTree,
} from '@shared/NodesPropertyTreeBuilder';
import {
  NodesValidatorTreeBuilder,
  InitialNodesValidatorTree,
} from '@shared/NodesValidatorTreeBuilder';

const outputsTree: InitialNodesOutputsTree = {
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
    d: {
      outputs: {
        number: {
          value: 12,
        },
      },
    },
  },
};

const inputsTree: InitialNodesInputsTree = {
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

const propertyTree: InitialNodesPropertyTree = {
  nodes: {
    a: {
      type: 'test',
      inputs: {
        string: {
          type: 'string',
        },
      },
      outputs: {
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
      outputs: {
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
      outputs: {
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
      outputs: {
        string: {
          type: 'string',
        },
        number: {
          type: 'number',
        },
      },
    },
  },
};

const validatorTree: InitialNodesValidatorTree = {
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
  let manager: NodesManager;

  beforeEach(() => {
    outputs = new NodesOutputsTreeBuilder(outputsTree);
    inputs = new NodesInputsTreeBuilder(inputsTree, outputs);
    properties = new NodesPropertyTreeBuilder(propertyTree);
    validator = new NodesValidatorTreeBuilder(validatorTree, propertyTree);
    manager = new NodesManager({
      inputTree: inputs,
      outputTree: outputs,
      propertyTree: properties,
      validatorTree: validator,
      blueprint: {},
    });
  });

  test('check to see if two nodes can connect', () => {
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

  test('check to see if default validator works (type comparison)', () => {
    manager.connect(
      {
        nodeId: 'a',
        inputId: 'string',
      },
      {
        nodeId: 'd',
        outputId: 'number',
      },
    );

    expect(inputs.value.nodes.d.inputs.string.value.value).toBe(undefined);
  });

  test('check to see if custom validator works', () => {
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
