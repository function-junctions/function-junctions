import { Instance } from '@function-junctions/shared';
import { useRecord } from '@react/Observable';
import { checkEditorInstanceValid } from '@react/Editor';

export type GridContentProps = {
  instance: Instance;
};

export default function GridContent({ instance }: GridContentProps) {
  if (!checkEditorInstanceValid(instance))
    throw new Error('The editor instance passed in is invalid');

  const [tree] = useRecord(instance);

  return <div>{JSON.stringify(tree)}</div>;
}
