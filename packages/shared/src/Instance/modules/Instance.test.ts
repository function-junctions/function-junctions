import { describe, expect, test } from 'vitest';
import { InitialTree } from '@shared/TreeBuilder';
import Instance, {
  InputBlueprint,
  NodesBlueprint,
  OutputBlueprint,
} from './Instance';
import { NodeInputValidator } from '@shared/NodesValidatorTreeBuilder';

const numberOutput: OutputBlueprint = {
  type: 'number',
};

const numberInputValidator: NodeInputValidator = (incomingOutput) =>
  typeof incomingOutput === 'number';

const numberInput: InputBlueprint = {
  ...numberOutput,
  validator: numberInputValidator,
};

const component = 'TEST';

const blueprint: NodesBlueprint = {
  Math: {
    component,
    inputBlueprints: {
      number: numberInput,
    },
    outputBlueprints: {
      number: numberOutput,
    },
  },
};

const initialTree: InitialTree = {
  nodes: {
    '0': {
      type: 'Math',
      x: 0,
      y: 0,
      inputs: {
        Number: {
          type: 'number',
          connection: undefined,
        },
      },
      outputs: {
        Number: {
          type: 'number',
          value: 0,
        },
      },
    },
  },
};

describe('Instance', () => {
  test('See if readonly instance can be initalized', () => {
    const instance = new Instance({
      blueprint,
      tree: initialTree,
    });

    expect(
      instance.inputTree.value.nodes['0'].inputs.Number.value,
    ).toStrictEqual({
      connection: undefined,
      value: undefined,
    });
  });

  test('See if instance api can be initalized', () => {
    const instance = new Instance({
      blueprint,
      tree: initialTree,
      additionalTreeBuilders: ['nodesValidator', 'nodeProperties'],
    });

    expect(instance.api).toBeDefined();
  });

  test('See if blueprint data is properly appended', () => {
    const instance = new Instance({
      blueprint,
      tree: initialTree,
      additionalTreeBuilders: ['nodesValidator', 'nodeProperties'],
    });

    const node = instance.value.nodes['0'];
    const input = node.inputs.Number;

    const { validator } = input;

    if (!validator)
      throw new Error('Validator is undefined when it should be defined');

    // Try to purposly fail the validator by passing in a string (which would pass on the default validator)
    const validatorValue: boolean = validator({
      type: 'number',
      value: '100',
    });

    expect(validatorValue).toEqual(false);
    expect(node.component).toEqual(component);
  });
});
