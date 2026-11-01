import './sources.css';
import { Drawable, SourceItem } from '../../../types';
import { cloneTemplate, getElement } from '../../../utils/dom';

class Sources implements Drawable<SourceItem> {
    public draw(data: readonly SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();

        data.forEach((item: SourceItem): void => {
            const sourceClone: DocumentFragment = cloneTemplate('#sourceItemTemp');

            getElement<HTMLSpanElement>('.source__item-name', sourceClone).textContent = item.name;
            getElement<HTMLDivElement>('.source__item', sourceClone).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement<HTMLDivElement>('.sources').append(fragment);
    }
}

export default Sources;
