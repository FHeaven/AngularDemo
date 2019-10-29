export interface ApiRequestInfo<T> {
    requestJson: T;
    url?: string;
    onSuccessFn?: Function;
    onFailed?: Function;
    onResponse?: Function;
}

export interface ApiResponseInfo<T> {
    result: string;
    message: string;
    responseObject: T;
}
