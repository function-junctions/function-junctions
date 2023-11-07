import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';
import { Observable } from '@shared/Observable';
import useObservable from './useObservable';

const primative = 'hello!';

describe('useObservable', () => {
  test('Check to see if useObservable hook can be initalized', () => {
    const observable = new Observable({ value: primative });
    const { result } = renderHook(() => useObservable(observable));

    const [value] = result.current;

    expect(value).toBe(primative);
  });

  test('Check to see if useObservable value can be modified', () => {
    const observable = new Observable({ value: 'UNUPDATED VALUE' });
    const { result } = renderHook(() => useObservable(observable));

    const [, setValue] = result.current;

    act(() => {
      setValue(primative);
    });

    const [value] = result.current;

    expect(value).toBe(primative);
  });
});
