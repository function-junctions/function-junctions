import { describe, expect, test } from 'vitest';
import Builder from './Builder';

type TestShallowObj = {
  field1: string;
};

const testObj: TestShallowObj = {
  field1: 'test',
};

type TestNestedObj = {
  field2: string;
  nested: TestShallowObj;
};

const testNestedObj: TestNestedObj = {
  field2: 'test',
  nested: {
    field1: 'test',
  },
};

describe('Builder', () => {
  test('should proxy a shallow object', () => {
    const proxyChanges: [string, string][] = [];
    const builder = new Builder(testObj).onPropertyChange(
      'field1',
      (oldValue, newValue) => proxyChanges.push([oldValue, newValue]),
    );
    const proxyObj = builder.create();

    const oldValue = testObj.field1;
    const newValue = 'test2';
    proxyObj.field1 = newValue;

    expect(proxyChanges).toEqual([[oldValue, newValue]]);
  });

  test('should proxy a nested object', () => {
    const proxyChanges: [string, string][] = [];
    const nestedProxyChanges: [string, string][] = [];

    const nestedBuilder = new Builder(testNestedObj.nested).onPropertyChange(
      'field1',
      (oldValue, newValue) => nestedProxyChanges.push([oldValue, newValue]),
    );
    const builder = new Builder(testNestedObj)
      .onPropertyChange('field2', (oldValue, newValue) =>
        proxyChanges.push([oldValue, newValue]),
      )
      .onPropertyRead('nested', () => nestedBuilder.create());
    const proxyObj = builder.create();

    const oldValue = testNestedObj.field2;
    const newValue = 'testNewValue';
    proxyObj.field2 = newValue;

    expect(proxyChanges).toEqual([[oldValue, newValue]]);

    const nestedOldValue = testNestedObj.nested.field1;
    const nestedNewValue = 'testNestedValue';
    proxyObj.nested.field1 = nestedNewValue;

    expect(nestedProxyChanges).toEqual([[nestedOldValue, nestedNewValue]]);
  });
});
