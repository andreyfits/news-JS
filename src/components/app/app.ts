import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ArticlesResponse, SourcesResponse } from '../../types';
import { getElement } from '../../utils/dom';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        getElement<HTMLDivElement>('.sources').addEventListener('click', (e: MouseEvent): void =>
            this.controller.getNews(e, (data: ArticlesResponse): void => this.view.drawNews(data))
        );
        this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;
