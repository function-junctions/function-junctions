import { StyledComponentProps } from '@react/StyledComponent';
import GridRoot from './GridRoot';
import GridContent, { GridContentProps } from './GridContent';

export type GridProps = StyledComponentProps & GridContentProps;

export default function Grid({ children, instance, ...restProps }: GridProps) {
  return (
    <GridRoot {...restProps}>
      <GridContent instance={instance} {...restProps}>
        {children}
      </GridContent>
    </GridRoot>
  );
}
