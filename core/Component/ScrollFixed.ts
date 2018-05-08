import { Trigger } from '@BEAST/Component/Trigger';
import { IPosition } from '@BEAST/Interface';

export class ScrollFixed extends Trigger
{
    public initialState: string;
    public position: number;
    constructor(element: Element, data: any)
    {
        super(element, data);
        this.position = Number(this.data[3]);
        this.initialState = this.state;
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

        if (y >= this.position)
            this.state = this.states.in;

        if (y <= this.position && this.initialState !== this.state)
            this.state = this.states.out;

        if (previous !== this.state)
        {
            this.element.classList.remove(previous);
            this.element.classList.add(this.state);
        }
    }
}