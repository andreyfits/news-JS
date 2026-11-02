import {
    ApiData,
    Callback,
    Endpoint,
    HttpMethod,
    HttpStatus,
    LoaderOptions,
    QueryOptions,
    RequestParams,
} from '../../types';

const LOGGED_ERROR_STATUSES: readonly number[] = [HttpStatus.Unauthorized, HttpStatus.NotFound];

class Loader {
    private readonly baseLink: string;
    private readonly options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T extends ApiData>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (LOGGED_ERROR_STATUSES.includes(res.status))
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<QueryOptions>, endpoint: Endpoint): string {
        const query: URLSearchParams = new URLSearchParams();

        Object.entries({ ...this.options, ...options }).forEach(([key, value]: [string, string | undefined]): void => {
            if (value !== undefined) query.set(key, value);
        });

        return `${this.baseLink}${endpoint}?${query.toString()}`;
    }

    private load<T extends ApiData>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: Partial<QueryOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response): Response => this.errorHandler(res))
            .then((res: Response): Promise<T> => res.json() as Promise<T>)
            .then((data: T): void => callback(data))
            .catch((err: unknown): void => console.error(err));
    }
}

export default Loader;
