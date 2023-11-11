import { ReactNode } from 'react';

export type NodeContentProps = {
  header: ReactNode;
  children: ReactNode;
};

export default function NodeContent({ header, children }: NodeContentProps) {
  return (
    <>
      {header}
      {children}
    </>
  );
}
