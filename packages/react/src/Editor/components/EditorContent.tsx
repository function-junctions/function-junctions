import {
  NodesBlueprint,
  EditorPermissions,
  permissionToLoader,
  Instance,
  InitialTree,
} from '@function-junctions/shared';
import { ReactNode, useMemo } from 'react';
import { Grid } from '@react/Grid';

export type EditorContentProps = {
  blueprint: NodesBlueprint<ReactNode>;
  defaultTree?: InitialTree;
  permissions?: EditorPermissions;

  children?: typeof Grid;
};

export default function EditorContent({
  blueprint,
  defaultTree,
  permissions,
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

  return children ? children({ instance }) : <Grid instance={instance} />;
}
