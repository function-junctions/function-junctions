import { Instance } from '@function-junctions/shared';

const checkEditorInstanceValid = ({
  editorPositionTree,
  nodesPositionTree,
  nodesComponentTree,
  nodesPropertyTree,
  outputTree,
  inputTree,
}: Instance) =>
  editorPositionTree ||
  nodesPositionTree ||
  nodesComponentTree ||
  nodesPropertyTree ||
  outputTree ||
  inputTree;

export default checkEditorInstanceValid;
