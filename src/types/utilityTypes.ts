import { Article, ArticlesResponse, NewsSource, QueryOptions, SourcesResponse } from './interfaces';

export type LoaderOptions = Readonly<Pick<QueryOptions, 'apiKey'>>;

export type SourceItem = Pick<NewsSource, 'id' | 'name'>;

export type NewsItem = Pick<
    Article,
    'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt'
>;

export type ApiData = SourcesResponse | ArticlesResponse;
