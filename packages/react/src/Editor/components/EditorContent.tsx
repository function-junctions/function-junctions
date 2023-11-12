import {
  EditorPermissions,
  permissionToLoader,
  Instance,
  InitialTree,
} from '@function-junctions/shared';
import { useMemo } from 'react';
import { Grid } from '@react/Grid';
import { NodesBlueprint } from '@react/Instance';
import { StyledComponentPropsAppearance } from '@react/StyledComponent';

export type EditorContentProps = {
  blueprint: NodesBlueprint;
  defaultTree?: InitialTree;
  permissions?: EditorPermissions;
  appearance?: StyledComponentPropsAppearance;

  children?: typeof Grid;
};

export default function EditorContent({
  blueprint,
  defaultTree,
  permissions,
  appearance,
  children,
}: EditorContentProps) {
  const loaders = useMemo(
    () =>
      permissionToLoader(
        permissions ?? {
          updateNodes: true,
        },
      ),
    [permissions],
  );

  const instance = useMemo(
    () =>
      new Instance({
        blueprint,
        tree: defaultTree,
        additionalTreeBuilders: loaders,
      }),
    [blueprint, defaultTree, loaders],
  );

  return children ? (
    children({ instance })
  ) : (
    <Grid appearance={appearance} instance={instance} />
  );
}
