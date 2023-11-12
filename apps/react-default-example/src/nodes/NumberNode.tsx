import { Node, NodeProps } from '@function-junctions/react';

export default function NumberNode(props: NodeProps) {
  return (
    <Node header="Number" {...props}>
      <input type="number" />
    </Node>
  );
}
