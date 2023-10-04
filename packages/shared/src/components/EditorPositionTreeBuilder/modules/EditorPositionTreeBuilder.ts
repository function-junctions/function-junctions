import { Observable } from '@/components';
import { deserializeEditorPositionTree } from '@/components/EditorPositionTreeBuilder';

export type SerializedEditorPositionTree = {
  editor?: {
    originX: number;
    originY: number;
    translateX: number;
    translateY: number;
    scale: number;
  };
};

export type EditorPositionTree = SerializedEditorPositionTree;

export default class EditorPositionTreeBuilder<
  T extends SerializedEditorPositionTree = SerializedEditorPositionTree,
> extends Observable<EditorPositionTree> {
  constructor(tree: T) {
    super(deserializeEditorPositionTree(tree));
  }
}
