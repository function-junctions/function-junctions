import { StyledComponent, StyledComponentProps } from '@react/StyledComponent';

export type NodeRootProps = StyledComponentProps;

const nodeRootClassName = `fj-node`;

export default function NodeRoot({ children, ...restProps }: NodeRootProps) {
  return (
    <StyledComponent className={nodeRootClassName} {...restProps}>
      {children}
    </StyledComponent>
  );
}
