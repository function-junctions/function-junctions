import {
  EditorPositionTree,
  SerializedEditorPositionTree,
} from '@/components/EditorPositionTreeBuilder';

const deserializeEditorPositionTree = <T extends SerializedEditorPositionTree>(
  serializedTree: T,
): EditorPositionTree => serializedTree;

export default deserializeEditorPositionTree;
