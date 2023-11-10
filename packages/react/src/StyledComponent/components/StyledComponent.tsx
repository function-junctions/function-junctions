import '@function-junctions/styles';

import { DetailedHTMLProps, HTMLAttributes, ReactNode, useMemo } from 'react';
import { useAppearance } from '@react/StyledComponent';

export type StyledComponentPropsTheme = 'default' | 'basic' | 'none';
export type StyledComponentPropsAppearance = 'light' | 'dark' | 'auto';

export type StyledComponentProps = {
  theme?: StyledComponentPropsTheme;
  appearance?: StyledComponentPropsAppearance;
  children?: ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function StyledComponent({
  theme: defaultTheme,
  appearance: defaultAppearance,
  children,
  className: defaultClassName,
  ...restProps
}: StyledComponentProps) {
  const theme: StyledComponentPropsTheme = useMemo(
    () => defaultTheme ?? `default`,
    [defaultTheme],
  );

  const appearance = useAppearance(defaultAppearance ?? `auto`);

  const className = useMemo(
    () => `fj-${theme} fj-${appearance}${` ${defaultClassName}` ?? ``}`,
    [appearance, defaultClassName, theme],
  );

  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  );
}
