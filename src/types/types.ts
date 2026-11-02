export type SourceCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export type ResponseStatus = 'ok' | 'error';

export type Callback<T> = (data: T) => void;
