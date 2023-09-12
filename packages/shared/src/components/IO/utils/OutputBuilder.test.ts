import { describe, expect, test } from 'vitest';
import Output, { type OutputParams } from './OutputBuilder';

const outputParams: OutputParams<string> = {
  type: 'test',
  value: 'test',
};

describe('Output', () => {
  test('should update value at runtime', () => {
    const outputProxy = new Output(outputParams);

    const output = outputProxy.create();

    const newValue = 'test2';

    output.value = newValue;
    const { value } = output;

    expect(value).toEqual(newValue);
  });
});
