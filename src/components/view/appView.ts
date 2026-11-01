import News from './news/news';
import Sources from './sources/sources';
import { ArticlesResponse, Drawable, NewsItem, SourceItem, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: Drawable<NewsItem>;
    private readonly sources: Drawable<SourceItem>;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<ArticlesResponse>): void {
        const values: readonly NewsItem[] = data.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<SourcesResponse>): void {
        const values: readonly SourceItem[] = data.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
