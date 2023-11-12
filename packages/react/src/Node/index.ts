import assign from 'lodash/assign';

import {
  Node as NodeComponent,
  NodeRoot,
  NodeContent,
  NodeHeader,
  type NodeHeaderProps,
  type NodeBodyProps,
  type NodeProps,
  type NodeIOProps,
  type NodeInputProps,
  type NodeOutputProps,
  type NodeInputsProps,
  type NodeOutputsProps,
  type NodeStore,
  type NodeStoreProps,
  NodeBody,
} from './components';

export const Node = assign(NodeComponent, {
  Root: NodeRoot,
  Content: NodeContent,
  Header: NodeHeader,
  Body: NodeBody,
});

export {
  NodeHeaderProps,
  NodeProps,
  NodeBodyProps,
  NodeIOProps,
  NodeInputProps,
  NodeOutputProps,
  NodeInputsProps,
  NodeOutputsProps,
  NodeStore,
  NodeStoreProps,
};
