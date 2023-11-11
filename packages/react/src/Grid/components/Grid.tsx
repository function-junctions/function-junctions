import { StyledComponentProps } from '@react/StyledComponent';
import GridRoot from './GridRoot';
import GridContent, { GridContentProps } from './GridContent';

export type GridProps = StyledComponentProps & GridContentProps;

export default function Grid({ children, ...restProps }: GridProps) {
  return (
    <GridRoot {...restProps}>
      <GridContent {...restProps}>{children}</GridContent>
    </GridRoot>
  );
}
