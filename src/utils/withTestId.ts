export const withTestId: (testId: string) => { 'data-testid'?: string } =
  process.env.NODE_ENV === 'test'
    ? (testId: string) => ({ 'data-testid': testId })
    : () => ({});
