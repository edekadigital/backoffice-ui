import * as React from 'react';

export interface PreformattedTextProps {
  children: React.ReactNode;
}

export const PreformattedText: React.FC<PreformattedTextProps> = ({
  children,
}) => {
  return <pre>{children}</pre>;
};
