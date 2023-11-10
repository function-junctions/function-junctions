import { StyledComponentPropsAppearance } from '@react/StyledComponent';
import { useEffect, useState } from 'react';

const getDefaultAppearance = (
  appearance: StyledComponentPropsAppearance,
): 'dark' | 'light' => {
  if (appearance !== 'auto') return appearance;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const useAppearance = (appearance: StyledComponentPropsAppearance) => {
  const [currentAppearance, setCurrentAppearance] = useState(
    getDefaultAppearance(appearance),
  );

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches }) => {
        if (appearance === 'auto')
          setCurrentAppearance(matches ? 'dark' : 'light');
      });

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => undefined);
    };
  }, [appearance]);

  return currentAppearance;
};

export default useAppearance;
