import { InputConnection } from '@shared/InputBuilder';
import { Dispatch, ReactElement, SetStateAction } from 'react';

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

export type NodeProps = NodeStoreProps & {
  inputs?: NodeInputsProps;
  outputs?: NodeOutputsProps;
};

export type Node = (props: NodeProps) => ReactElement;
