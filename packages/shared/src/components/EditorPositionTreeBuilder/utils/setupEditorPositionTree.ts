import {
  EditorPositionTree,
  InitialEditorPositionTree,
} from '@/components/EditorPositionTreeBuilder';

const setupEditorPositionTree = <T extends InitialEditorPositionTree>(
  initialTree: T,
): EditorPositionTree => ({ editor: initialTree.editor });

export default setupEditorPositionTree;
