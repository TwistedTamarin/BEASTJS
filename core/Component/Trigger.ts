import { IPosition } from '@BEAST/Interface';

export class Trigger
{
    public data: any;
    public state: string;

    public element: HTMLElement;
    public offsets: IPosition;
    public states: any;

    constructor(element: Element, data: any)
    {
        this.state = "beast-rest";
        this.data = data;
        this.element = <HTMLElement>element;

        this.element.classList.add("beast-anim");
        this.element.classList.add(this.state);

        this.states = {};
        this.states.in = (this.data[1]) ? this.data[1] : '';
        this.states.out = (this.data[2]) ? this.data[2] : '';

        this.offsets = <IPosition>{};
        this.offsets.top = (this.data[3]) ? Number(this.data[3]) : 0;
        this.offsets.bottom = (this.data[4]) ? Number(this.data[4]) : 0;
    }

    public update(event?: string, data?: any)
    {
        let previous = this.state;

        if (event === "load")
            this.state = this.states.in;

        if (previous !== this.state)
        {
            this.element.classList.remove(previous);
            this.element.classList.add(this.state);
        }
    }
}