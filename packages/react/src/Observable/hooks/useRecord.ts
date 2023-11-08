import keys from 'lodash/keys';
import { Observable } from '@shared/Observable';
import { NestedRecord } from '@shared/Observable/modules/Observable';
// eslint-disable-next-line object-curly-newline
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useRecord = <T extends NestedRecord<unknown> = NestedRecord<unknown>>(
  observable: Observable<T>,
): [T, Dispatch<SetStateAction<T | undefined>>] => {
  const [value, setValue] = useState(observable.value);
  const [value$, setValue$] = useState<T>();

  useEffect(() => {
    const unsubscribe = observable.subscribe((newValue) => {
      setValue(newValue);
    });

    return unsubscribe;
  }, [observable]);

  useEffect(() => {
    if (!value$) return;
    keys(observable.value).forEach((key) => {
      // @ts-expect-error: The assignment here will always work since keys is
      // iterating over the observable value
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment
      observable.value[key] = value$[key];
    });
  }, [observable, value$]);

  return [value, setValue$];
};

export default useRecord;
