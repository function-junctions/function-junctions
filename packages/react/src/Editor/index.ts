import assign from 'lodash/assign';

import {
  Editor as EditorComponent,
  EditorRoot,
  EditorContent,
} from './components';

export { checkEditorInstanceValid } from './utils';

export const Editor = assign(EditorComponent, {
  Root: EditorRoot,
  Content: EditorContent,
});
