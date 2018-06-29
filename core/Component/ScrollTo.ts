import { Trigger } from '@BEAST/Component/Trigger';

export class ScrollTo extends Trigger
{
    public target: Element;
    constructor(element: Element, data: any)
    {
        super(element, data);
        this.target = document.querySelector(data[1]);
    }

    public update(event?: string, data?: any)
    {
        if (event === "click")
            window.scrollTo(this.target.scrollTop);
    }
}