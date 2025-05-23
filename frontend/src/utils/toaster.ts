import { enqueueSnackbar } from 'notistack';

const toaster = {
    success: (message: string) => {
        enqueueSnackbar(message, { variant: 'success' });
    },
    error: (message: string) => {
        enqueueSnackbar(message, { variant: 'error' });
    },
    info: (message: string) => {
        enqueueSnackbar(message, { variant: 'info' });
    },
    warning: (message: string) => {
        enqueueSnackbar(message, { variant: 'warning' });
    },
};

export default toaster;
