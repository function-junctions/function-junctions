import { StyledComponentProps } from '@react/StyledComponent';
import EditorRoot from './EditorRoot';
import EditorContent, { EditorContentProps } from './EditorContent';

export type EditorProps = StyledComponentProps & EditorContentProps;

export default function Editor({ children, ...restProps }: EditorProps) {
  return (
    <EditorRoot {...restProps}>
      <EditorContent {...restProps}>{children}</EditorContent>
    </EditorRoot>
  );
}
