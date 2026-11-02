import AppLoader from './appLoader';
import { ArticlesResponse, Callback, Endpoint, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<ArticlesResponse>): void {
        const newsContainer: EventTarget | null = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement) || !(e.target instanceof Element)) return;

        const sourceItem: HTMLElement | null = e.target.closest<HTMLElement>('.source__item');
        const sourceId: string | null = sourceItem?.getAttribute('data-source-id') ?? null;

        if (sourceId === null || newsContainer.getAttribute('data-source') === sourceId) return;

        newsContainer.setAttribute('data-source', sourceId);
        super.getResp<ArticlesResponse>(
            {
                endpoint: Endpoint.Everything,
                options: {
                    sources: sourceId,
                },
            },
            callback
        );
    }
}

export default AppController;
