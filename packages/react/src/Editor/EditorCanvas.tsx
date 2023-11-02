import { Instance } from '@function-junctions/shared';

export type EditorCanvasProps = {
  instance: Instance;
};

export default function EditorCanvas({ instance }: EditorCanvasProps) {
  return <div>{JSON.stringify(instance)}</div>;
}
