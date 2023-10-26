import {
  EditorPositionTree,
  InitialEditorPositionTree,
} from '@/EditorPositionTreeBuilder';

const setupEditorPositionTree = <T extends InitialEditorPositionTree>(
  initialTree: T,
): EditorPositionTree => ({ editor: initialTree.editor });

export default setupEditorPositionTree;
