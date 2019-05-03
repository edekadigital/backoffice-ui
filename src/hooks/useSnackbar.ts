import { useSnackbar as origUseSnackbar } from 'notistack';

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

export const useSnackbar: () => SnackbarApi = () => {
  const { enqueueSnackbar } = origUseSnackbar();

  const push = (message: string, options: SnackbarOptions = {}) => {
    const { variant = 'default' } = options;
    enqueueSnackbar(message, { variant });
  };

  return {
    push,
  };
};
