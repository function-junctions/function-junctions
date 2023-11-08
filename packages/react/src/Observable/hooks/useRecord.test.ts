import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { Observable } from '@shared/Observable';
import useRecord from './useRecord';

const record = {
  value1: 'string',
  value2: 0,
};

describe('useRecord', () => {
  test('Check to see if useRecord hook can be initalized', () => {
    const observable = new Observable(record);
    const { result } = renderHook(() => useRecord(observable));

    const [value] = result.current;

    expect(value).toStrictEqual(record);
  });

  test('Check to see if useRecord value can be modified', () => {
    const newRecord = {
      value1: 'hello!',
      value2: 1,
    };

    const observable = new Observable(record);
    const { result } = renderHook(() => useRecord(observable));

    const [, setValue] = result.current;

    act(() => {
      setValue(newRecord);
    });

    const [value] = result.current;

    expect(value).toStrictEqual(newRecord);
  });
});
