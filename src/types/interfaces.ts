import { Endpoint } from './enums';
import { ResponseStatus, SourceCategory } from './types';

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: SourceCategory;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface ApiResponse {
    status: ResponseStatus;
}

export interface SourcesResponse extends ApiResponse {
    sources: NewsSource[];
}

export interface ArticlesResponse extends ApiResponse {
    totalResults: number;
    articles: Article[];
}

export interface QueryOptions {
    apiKey: string;
    sources: string;
}

export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<QueryOptions>;
}

export interface Drawable<T> {
    draw(data: readonly T[]): void;
}
