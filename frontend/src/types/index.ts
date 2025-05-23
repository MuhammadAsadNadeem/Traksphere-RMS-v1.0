export type ApiResponseType<T> = {
    data: T | null | undefined,
    message: string,
}