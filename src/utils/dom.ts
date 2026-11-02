export function getElement<T extends Element>(selector: string, root: ParentNode = document): T {
    const element: T | null = root.querySelector<T>(selector);

    if (element === null) {
        throw new Error(`Element "${selector}" not found`);
    }

    return element;
}

export function cloneTemplate(selector: string): DocumentFragment {
    const template: HTMLTemplateElement = getElement<HTMLTemplateElement>(selector);

    return document.importNode(template.content, true);
}
