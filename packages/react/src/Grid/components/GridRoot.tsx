import { StyledComponent, StyledComponentProps } from '@react/StyledComponent';

export type GridRootProps = StyledComponentProps;

const gridRootClassName = `fj-grid`;

export default function GridRoot({ children, ...restProps }: GridRootProps) {
  return (
    <StyledComponent className={gridRootClassName} {...restProps}>
      {children}
    </StyledComponent>
  );
}
