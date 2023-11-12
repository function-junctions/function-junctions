import { StyledComponentProps } from '@react/StyledComponent';
import EditorRoot from './EditorRoot';
import EditorContent, { EditorContentProps } from './EditorContent';

export type EditorProps = StyledComponentProps & EditorContentProps;

export default function Editor({
  children,
  blueprint,
  defaultTree,
  permissions,
  appearance,
  ...restProps
}: EditorProps) {
  return (
    <EditorRoot {...restProps} appearance={appearance}>
      <EditorContent
        blueprint={blueprint}
        defaultTree={defaultTree}
        permissions={permissions}
        appearance={appearance}
      >
        {children}
      </EditorContent>
    </EditorRoot>
  );
}
