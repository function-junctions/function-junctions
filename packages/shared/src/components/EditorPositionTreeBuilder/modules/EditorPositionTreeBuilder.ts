import { Observable } from '@/components';
import { setupEditorPositionTree } from '@/components/EditorPositionTreeBuilder';

export type InitialEditorPositionTree = {
  editor?: {
    originX: number;
    originY: number;
    translateX: number;
    translateY: number;
    scale: number;
  };
};

export type EditorPositionTree = InitialEditorPositionTree;

export default class EditorPositionTreeBuilder<
  T extends InitialEditorPositionTree = InitialEditorPositionTree,
> extends Observable<EditorPositionTree> {
  constructor(tree: T) {
    super(setupEditorPositionTree(tree));
  }
}
