import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { Observable } from '@shared/Observable';
import usePrimative from './usePrimative';

const primative = 'hello!';

describe('usePrimative', () => {
  test('Check to see if usePrimative hook can be initalized', () => {
    const observable = new Observable({ value: primative });
    const { result } = renderHook(() => usePrimative(observable));

    const [value] = result.current;

    expect(value).toBe(primative);
  });

  test('Check to see if usePrimative value can be modified', () => {
    const observable = new Observable({ value: 'UNUPDATED VALUE' });
    const { result } = renderHook(() => usePrimative(observable));

    const [, setValue] = result.current;

    act(() => {
      setValue(primative);
    });

    const [value] = result.current;

    expect(value).toBe(primative);
  });
});
