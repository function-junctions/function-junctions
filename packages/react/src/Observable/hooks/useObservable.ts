import { Observable } from '@shared/Observable';
import { useEffect, useState } from 'react';

const useObservable = <T>(observable: Observable<{ value: T }>) => {
  const [value, setValue] = useState(observable.value.value);
  const [value$, setValue$] = useState<T>();

  useEffect(() => {
    const unsubscribe = observable.subscribe(({ value: newValue }) => {
      setValue(newValue);
    });

    return unsubscribe;
  }, [observable]);

  useEffect(() => {
    if (!value$) return;
    // eslint-disable-next-line no-param-reassign
    observable.value.value = value$;
  }, [observable, value$]);

  return [value, setValue$];
};

export default useObservable;
