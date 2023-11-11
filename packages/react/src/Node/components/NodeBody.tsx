import { StyledComponent, StyledComponentProps } from '@react/StyledComponent';

export type NodeBodyProps = StyledComponentProps;

const nodeBodyClassName = `fj-node-body`;

export default function NodeBody({ children, ...restProps }: NodeBodyProps) {
  return (
    <StyledComponent className={nodeBodyClassName} {...restProps}>
      {children}
    </StyledComponent>
  );
}
