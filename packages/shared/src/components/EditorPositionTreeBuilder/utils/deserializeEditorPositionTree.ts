import {
  EditorPositionTree,
  SerializedEditorPositionTree,
} from '@/components/EditorPositionTreeBuilder';

const deserializeEditorPositionTree = <T extends SerializedEditorPositionTree>(
  serializedTree: T,
): EditorPositionTree => ({ editor: serializedTree.editor });

export default deserializeEditorPositionTree;
