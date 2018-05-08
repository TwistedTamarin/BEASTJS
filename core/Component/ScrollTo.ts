import { Trigger } from '@BEAST/Component/Trigger';
import { IPosition } from '@BEAST/Interface';

export class ScrollTo extends Trigger
{
    public position: IPosition;

    constructor(element: Element, data: any)
    {
        super(element, data);
        this.position = <IPosition>{};
    }

    public update(event?: string, data?: any)
    {
        if (event === "scroll")
            this.updateScroll(data.x, data.y);
    }

    private updateScroll(x: number, y: number)
    {
        let previous = this.state;
        y = (!y) ? window.pageYOffset : y;
        x = (!x) ? window.pageXOffset : x;

        if (y >= this.position.top)
            this.state = this.states.in;

        if (y >= this.position.bottom)
            this.state = this.states.out;

        if (previous !== this.state)
        {
            this.element.classList.remove(previous);
            this.element.classList.add(this.state);
        }
    }
}