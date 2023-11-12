import { Editor, NodesBlueprint, InitialTree } from '@function-junctions/react';
import NumberNode from './nodes/NumberNode';

const blueprint: NodesBlueprint = {
  number: {
    outputBlueprints: {
      Number: {
        type: 'number',
        defaultValue: 0,
      },
    },
    component: NumberNode,
  },
};

const defaultTree: InitialTree = {
  editor: {
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
    scale: 0,
  },
  nodes: {
    test: {
      type: 'number',
      x: 0,
      y: 0,
      outputs: {
        number: {
          type: 'number',
          value: 10,
        },
      },
    },
  },
};

export default function App() {
  return (
    <Editor
      blueprint={blueprint}
      defaultTree={defaultTree}
      style={{ width: `100%`, height: `100% ` }}
    />
  );
}
