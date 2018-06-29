import { Scroll } from '@BEAST/Component/Scroll';

export class ScrollFixed extends Scroll
{
    public initialState: string;
    public fixPosition: number;

    constructor(element: Element, data: any)
    {
        super(element, data);
        this.fixPosition = Number(this.data[3]);
        this.initialState = this.state;
    }

    public updateScroll(x: number, y: number)
    {
        let previous = this.state;
        y = (!y) ? window.pageYOffset : y;
        x = (!x) ? window.pageXOffset : x;

        if (y >= this.fixPosition)
            this.state = this.states.in;
        else if (y <= this.fixPosition && this.initialState !== this.state)
            this.state = this.states.out;

        if (previous !== this.state)
        {
            this.element.classList.remove(previous);
            this.element.classList.add(this.state);
        }
    }
}