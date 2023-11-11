import assign from 'lodash/assign';

import {
  Node as NodeComponent,
  NodeRoot,
  NodeContent,
  NodeHeader,
  type NodeHeaderProps,
  type NodeBodyProps,
  NodeBody,
} from './components';

export const Node = assign(NodeComponent, {
  Root: NodeRoot,
  Content: NodeContent,
  Header: NodeHeader,
  Body: NodeBody,
});

export { NodeHeaderProps, NodeBodyProps };
