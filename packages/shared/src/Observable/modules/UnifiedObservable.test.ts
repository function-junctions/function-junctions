import { describe, expect, test } from 'vitest';
import { Observable, UnifiedObservable } from '.';

describe('Unified Observable', () => {
  test('See if unified observable values are properly set', () => {
    const a = new Observable({ a: 1 });
    const b = new Observable({ b: 2 });
    const c = new Observable({ c: 3 });

    const unified = new UnifiedObservable(a, b, c);

    expect(unified.value).toStrictEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
  test('See if unified observable values properly persist to original trees', () => {
    const a = new Observable({ a: 1 });
    const b = new Observable({ b: 2 });
    const c = new Observable({ c: 3 });

    const unified = new UnifiedObservable(a, b, c);

    unified.value.a = 2;
    unified.value.b = 3;
    unified.value.c = 4;

    expect({ a: a.value.a, b: b.value.b, c: c.value.c }).toStrictEqual({
      a: 2,
      b: 3,
      c: 4,
    });
  });
  test('See if unified observable values properly persist to new trees', () => {
    const a = new Observable({ a: 1 });
    const b = new Observable({ b: 2 });
    const c = new Observable({ c: 3 });

    const unified = new UnifiedObservable(a, b, c);

    a.value.a = 3;
    b.value.b = 4;
    c.value.c = 5;

    expect({
      a: unified.value.a,
      b: unified.value.b,
      c: unified.value.c,
    }).toStrictEqual({
      a: 3,
      b: 4,
      c: 5,
    });
  });
  test('See if unified observable nested values properly persist to original trees', () => {
    const a = new Observable({ a: { a: 1 } });
    const b = new Observable({ b: { b: 2 } });
    const c = new Observable({ c: { c: 3 } });

    const unified = new UnifiedObservable(a, b, c);

    unified.value.a.a = 4;
    unified.value.b.b = 5;
    unified.value.c.c = 6;

    expect({
      a: a.value.a.a,
      b: b.value.b.b,
      c: c.value.c.c,
    }).toStrictEqual({
      a: 4,
      b: 5,
      c: 6,
    });
  });
  test('See if unified nested observable values properly persist to new trees', () => {
    const a = new Observable({ a: { a: 1 } });
    const b = new Observable({ b: { b: 2 } });
    const c = new Observable({ c: { c: 3 } });

    const unified = new UnifiedObservable(a, b, c);

    a.value.a.a = 5;
    b.value.b.b = 6;
    c.value.c.c = 7;

    expect({
      a: unified.value.a.a,
      b: unified.value.b.b,
      c: unified.value.c.c,
    }).toStrictEqual({
      a: 5,
      b: 6,
      c: 7,
    });
  });
  test('See if observables with nested values copy', () => {
    const a = new Observable({ a: { a: new Observable({ value: 1 }) } });
    const b = new Observable({ b: { b: new Observable({ value: 2 }) } });
    const c = new Observable({ c: { c: new Observable({ value: 3 }) } });

    const unified = new UnifiedObservable(a, b, c);

    a.value.a.a.value.value = 6;
    b.value.b.b.value.value = 7;
    c.value.c.c.value.value = 8;

    expect({
      a: unified.value.a.a.value.value,
      b: unified.value.b.b.value.value,
      c: unified.value.c.c.value.value,
      aInstance: typeof unified.value.a.a.subscribe,
      bInstance: typeof unified.value.b.b.subscribe,
      cInstance: typeof unified.value.c.c.subscribe,
    }).toStrictEqual({
      a: 6,
      b: 7,
      c: 8,
      aInstance: 'function',
      bInstance: 'function',
      cInstance: 'function',
    });
  });
});
