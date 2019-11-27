import { IPosition, Config } from '@BEAST/Interface';

export class Trigger {
    public data: any;
    public state: string;

    public element: HTMLElement;
    public states: any = {};
    public extra: any = {};

    constructor(element: Element, data: any) 
    {
        this.state = "beast-rest";
        this.data = data;
        this.element = <HTMLElement>element;

        this.element.classList.add("beast");
        this.element.classList.add(this.state);

        this.states.in = (this.data[1]) ? this.data[1] : '';
        this.states.out = (this.data[2]) ? this.data[2] : '';

        this.extra.delay = (this.data[3]) ? this.data[3] : null;
    }

    public update(event?: string) 
    {
        let previous = this.state;
        if (event === "load")
            this.state = this.states.in;

        if (previous !== this.state) 
        {
            if(this.extra.delay != null)
                setTimeout(()=>{this.animate(previous, this.state)}, this.extra.delay);
            else
                this.animate(previous, this.state);
        }
    }
    public animate(prev, next)
    {
        this.element.classList.remove(prev);
        this.element.scrollBy(0, 0);
        this.element.classList.add(next);
    }

    public onIntersect(event) 
    {
        if (event.intersectionRatio > 0.2) 
            this.animate(this.states.out, this.states.in);
        else if (event.intersectionRatio <= 0) 
            this.animate(this.states.in, this.states.out);
    }
}