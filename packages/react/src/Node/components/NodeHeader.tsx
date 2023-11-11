import { StyledComponent, StyledComponentProps } from '@react/StyledComponent';

export type NodeHeaderProps = StyledComponentProps;

const nodeHeaderClassName = `fj-node-header`;

export default function NodeHeader({
  children,
  ...restProps
}: NodeHeaderProps) {
  return (
    <StyledComponent className={nodeHeaderClassName} {...restProps}>
      {children}
    </StyledComponent>
  );
}
