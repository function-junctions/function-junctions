import keys from 'lodash/keys';

export enum EditorPermission {
  UpdateNodes = 'updateNodes',
}

export type EditorPermissions = Record<EditorPermission, boolean>;

const permissionToLoader = (permissions: EditorPermissions) =>
  keys(permissions).flatMap((permission) => {
    switch (permission as EditorPermission) {
      case EditorPermission.UpdateNodes:
        return ['nodeProperties', 'nodesValidator'];
      default:
        return [];
    }
  });

export default permissionToLoader;
