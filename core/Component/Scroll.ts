import { Trigger } from '@BEAST/Component/Trigger';
import { IPosition, Config } from '@BEAST/Interface';
import { Debug } from '@BEAST/Component/Debug';

export class Scroll extends Trigger
{
    public position: IPosition;
    constructor(element: Element, data: any)
    {
        super(element, data);
        this.position = <IPosition>{};
        this.parse();
        if(Config.debug)
            new Debug(this.element, "trigger");
    }

    parse()
    {
        this.position.top = this.element.offsetTop + this.offsets.top;
        this.position.bottom = (this.element.offsetTop + this.element.offsetHeight) - this.offsets.bottom;
    }

    public update(event?: string, data?: any)
    {
        if (event === "scroll")
            this.updateScroll(data.x, data.y);
        
        if(event === "resize")
            this.parse();
    }

    public updateScroll(x: number, y: number)
    {
        y = (!y) ? window.pageYOffset : y;
        x = (!x) ? window.pageXOffset : x;

        let previous = this.state;
        let viewport = {top: y + parseInt(Config.viewport.top),bottom: y + (window.innerHeight - parseInt(Config.viewport.bottom))};

        if((viewport.bottom > this.position.top || viewport.top < this.position.bottom) && !(viewport.bottom < this.position.top) && !(viewport.top > this.position.bottom))
            this.state = this.states.in;
        else 
            this.state = this.states.out;

        if (previous !== this.state)
        {
            this.element.classList.remove(previous);
            this.element.classList.add(this.state);
        }
    }
}