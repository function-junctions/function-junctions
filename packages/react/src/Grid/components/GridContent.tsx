import { Instance } from '@function-junctions/shared';
import { useRecord } from '@react/Observable';
import { checkEditorInstanceValid } from '@react/Editor';
import { ReactNode } from 'react';
import keys from 'lodash/keys';
import { NodesBlueprint } from '@react/Instance';
import { StyledComponentPropsAppearance } from '@react/StyledComponent';

export type GridContentProps = {
  instance: Instance<NodesBlueprint>;
  appearance?: StyledComponentPropsAppearance;
  children?: ReactNode;
};

export default function GridContent({
  instance,
  children: _,
}: GridContentProps) {
  if (!checkEditorInstanceValid(instance))
    throw new Error('The editor instance passed in is invalid');

  const [tree] = useRecord(instance);

  return keys(tree.nodes).map((key) => {
    const node = tree.nodes[key];

    return JSON.stringify(node);
  });
}
