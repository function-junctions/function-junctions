import { describe, expect, test } from 'vitest';
import Proxyable from './Proxyable';

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

describe('Proxyable', () => {
  test('should proxy a shallow object', () => {
    const proxyChanges: [string, string][] = [];
    const proxyable = new Proxyable(testObj).onPropertyChange(
      'field1',
      (oldValue, newValue) => proxyChanges.push([oldValue, newValue]),
    );
    const proxyObj = proxyable.create();

    const oldValue = testObj.field1;
    const newValue = 'test2';
    proxyObj.field1 = newValue;

    expect(proxyChanges).toEqual([[oldValue, newValue]]);
  });

  test('should proxy a nested object', () => {
    const proxyChanges: [string, string][] = [];
    const nestedProxyChanges: [string, string][] = [];

    const nestedProxyable = new Proxyable(
      testNestedObj.nested,
    ).onPropertyChange('field1', (oldValue, newValue) =>
      nestedProxyChanges.push([oldValue, newValue]),
    );
    const proxyable = new Proxyable(testNestedObj)
      .onPropertyChange('field2', (oldValue, newValue) =>
        proxyChanges.push([oldValue, newValue]),
      )
      .onPropertyRead('nested', () => nestedProxyable.create());
    const proxyObj = proxyable.create();

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
