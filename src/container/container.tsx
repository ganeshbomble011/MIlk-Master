import React, { ReactNode } from 'react';
import './container.css';

interface ContainerProps {
  children: ReactNode;
  size?: 'fluid' | 'small' | 'large'; // add a type for size if you want flexibility
}

function Container({ children, size = 'fluid' }: ContainerProps) {
  return <div className={`container container-${size}`}>{children}</div>;
}

export { Container };
