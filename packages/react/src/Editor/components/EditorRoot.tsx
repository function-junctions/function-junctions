import { StyledComponent, StyledComponentProps } from '@react/StyledComponent';

export type EditorRootProps = StyledComponentProps;

const editorRootClassName = `fj-editor`;

export default function EditorRoot({
  children,
  ...restProps
}: EditorRootProps) {
  return (
    <StyledComponent className={editorRootClassName} {...restProps}>
      {children}
    </StyledComponent>
  );
}
