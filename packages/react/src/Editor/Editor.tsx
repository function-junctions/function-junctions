import {
  NodesBlueprint,
  EditorPermissions,
  permissionToLoader,
  Instance,
  InitialTree,
} from '@function-junctions/shared';
import EditorCanvas from './EditorCanvas';

export type EditorProps = {
  blueprint: NodesBlueprint;
  defaultTree?: InitialTree;
  permissions?: EditorPermissions;
};

export default function Editor({
  blueprint,
  defaultTree,
  permissions,
}: EditorProps) {
  const loaders = permissionToLoader(
    permissions ?? {
      updateNodes: true,
    },
  );

  const instance = new Instance({
    blueprint,
    tree: defaultTree,
    additionalTreeBuilders: loaders,
  });

  return <EditorCanvas instance={instance} />;
}
