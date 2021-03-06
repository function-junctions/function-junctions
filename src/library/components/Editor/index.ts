import { writable } from 'svelte/store';
import type { Position } from '../Drag';
import { type NodeBlueprint, Nodes, type NodeState } from '../Nodes';

export type EditorState = Partial<{
  nodes: Record<string, NodeState>;
  position: Position;
}>;
export class Editor extends Nodes {
  constructor (blueprint: Record<string, NodeBlueprint>, initialState?: EditorState, readonly?: boolean) {
    super(
      writable(initialState?.position ?? {
        originX: 0,
        originY: 0,
        translateX: 0,
        translateY: 0,
        scale: 1,
      }),
      {
        registered: writable(blueprint),
        current: writable({}),
        selected: writable([]),
      },
      {
        nodes: writable<Record<string, NodeState>>(initialState?.nodes ?? {}),
        restored: writable<boolean>(false),
      },
      {
        show: writable(false),
        state: writable(),
      },
      writable(readonly ?? false),
    );
  }
}