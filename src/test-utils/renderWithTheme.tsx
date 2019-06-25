import * as React from 'react';
import { ThemeProvider } from '../providers/ThemeProvider';

export const renderWithTheme: React.FC = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);
