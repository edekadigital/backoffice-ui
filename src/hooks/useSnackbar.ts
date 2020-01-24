import * as React from 'react';
// import { useSnackbar as origUseSnackbar } from 'notistack';

export type SnackbarVariant =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface SnackbarOptions {
  variant?: SnackbarVariant;
}

export interface SnackbarApi {
  push: (message: string, options?: SnackbarOptions) => void;
}

export const useSnackbar = () => {
  // const { enqueueSnackbar } = origUseSnackbar();
  // const api = React.useMemo<SnackbarApi>(() => {
  //   const push = (message: string, options: SnackbarOptions = {}) => {
  //     const { variant = 'default' } = options;
  //     enqueueSnackbar(message, { variant });
  //   };
  //   return {
  //     push,
  //   };
  // }, [enqueueSnackbar]);
  // return api;
};
