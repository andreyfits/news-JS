import './news.css';
import { Drawable, NewsItem } from '../../../types';
import { cloneTemplate, getElement } from '../../../utils/dom';

const MAX_NEWS_COUNT: number = 10;
const PLACEHOLDER_IMAGE: string = 'img/news_placeholder.jpg';

class News implements Drawable<NewsItem> {
    public draw(data: readonly NewsItem[]): void {
        const news: readonly NewsItem[] = data.slice(0, MAX_NEWS_COUNT);
        const fragment: DocumentFragment = document.createDocumentFragment();

        news.forEach((item: NewsItem, idx: number): void => {
            const newsClone: DocumentFragment = cloneTemplate('#newsItemTemp');

            if (idx % 2) getElement<HTMLDivElement>('.news__item', newsClone).classList.add('alt');

            getElement<HTMLDivElement>('.news__meta-photo', newsClone).style.backgroundImage = `url(${
                item.urlToImage || PLACEHOLDER_IMAGE
            })`;
            getElement<HTMLLIElement>('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            getElement<HTMLLIElement>('.news__meta-date', newsClone).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement<HTMLHeadingElement>('.news__description-title', newsClone).textContent = item.title;
            getElement<HTMLHeadingElement>('.news__description-source', newsClone).textContent = item.source.name;
            getElement<HTMLParagraphElement>('.news__description-content', newsClone).textContent = item.description;
            getElement<HTMLAnchorElement>('.news__read-more a', newsClone).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer: HTMLDivElement = getElement<HTMLDivElement>('.news');

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
