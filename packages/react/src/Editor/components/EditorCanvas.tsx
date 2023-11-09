import { Instance } from '@function-junctions/shared';
import { useRecord } from '@react/Observable';
import { checkEditorInstanceValid } from '@react/Editor';

export type EditorCanvasProps = {
  instance: Instance;
};

export default function EditorCanvas({ instance }: EditorCanvasProps) {
  if (!checkEditorInstanceValid(instance))
    throw new Error('The editor instance passed in is invalid');

  const [tree] = useRecord(instance);

  return <div>{JSON.stringify(tree)}</div>;
}
