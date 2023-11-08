import { Observable } from '@shared/Observable';
import { NestedRecord } from '@shared/Observable/modules/Observable';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

const useRecord = <T extends NestedRecord<unknown> = NestedRecord<unknown>>(
  observable: Observable<T>,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(observable.value);

  const setValue$ = useCallback(
    (action: SetStateAction<T>) => {
      const newValue = typeof action === 'function' ? action(value) : action;
      // eslint-disable-next-line no-param-reassign
      observable.value = newValue;
      setValue(newValue);
    },
    [observable, value],
  );

  useEffect(() => {
    const unsubscribe = observable.subscribe(setValue);
    return unsubscribe;
  }, [observable]);

  return [value, setValue$];
};

export default useRecord;
