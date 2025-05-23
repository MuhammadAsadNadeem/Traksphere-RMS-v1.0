import { AxiosError } from "axios";

export const errorReturn = (err: any) => {
    let currentError = err;
    if (!err.response) {
        currentError = err.error
    }
    if (err instanceof AxiosError) {
        currentError = err.response?.data.error
    }
    return currentError;
}