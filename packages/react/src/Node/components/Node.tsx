import { Dispatch, SetStateAction } from 'react';
import { InputConnection } from '@shared/InputBuilder';
import NodeRoot from './NodeRoot';
import NodeContent, { NodeContentProps } from './NodeContent';
import NodeHeader from './NodeHeader';
import NodeBody from './NodeBody';

export type NodeIOProps<T = unknown> = {
  value: T;
  type: string;
};

export type NodeInputProps<T = unknown> = NodeIOProps<T> & {
  connection?: InputConnection;
};

export type NodeOutputProps<T = unknown> = NodeIOProps<T> & {
  setValue?: Dispatch<SetStateAction<T>>;
};

export type NodeInputsProps = Record<string, NodeInputProps>;
export type NodeOutputsProps = Record<string, NodeOutputProps>;

export type NodeStore = Record<string, unknown>;
export type NodeStoreProps<T extends NodeStore = NodeStore> = {
  store: T;
  setStore?: Dispatch<SetStateAction<T>>;
};

export type NodeDataProps = NodeStoreProps & {
  inputs?: NodeInputsProps;
  outputs?: NodeOutputsProps;
};

export type NodeProps = NodeContentProps;

export default function Node({ children, header, ...restProps }: NodeProps) {
  return (
    <NodeRoot {...restProps}>
      <NodeContent header={<NodeHeader>{header}</NodeHeader>} {...restProps}>
        <NodeBody>{children}</NodeBody>
      </NodeContent>
    </NodeRoot>
  );
}
