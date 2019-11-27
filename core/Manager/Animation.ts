import { Trigger, ScrollTo } from '@BEAST/Component';
import { Intersect } from '@BEAST/Manager/Intersect';
import { Interact } from '@BEAST/Component/Interact';

export class AnimationManager
{
    public elements: Element[];
    public intersect: Intersect;

    public triggers: any;

    constructor()
    {
        this.elements = [];
        this.triggers = {scroll: [],load: []};
        this.process();

        if (document.readyState === "complete" || document.readyState !== "loading")
            this.onLoaded();
        else
            document.addEventListener("DOMContentLoaded", this.onLoaded.bind(this));

        window.addEventListener("resize", this.onResize.bind(this));
    }

    private process()
    {
        let nodes = document.querySelectorAll("[beast]");
        for (let i = 0, il = nodes.length; i < il; i++)
        {
            let props = nodes[i].getAttribute('beast').split("|");

            if (props[0] && props[0] === 'scroll')
                this.intersect.add(nodes[i], props);

            if (props[0] && props[0] === 'scrollTo')
                this.triggers.scroll.push(new ScrollTo(nodes[i], props));

            if(props[0] && props[0] == "interact")
                this.triggers.interact.push(new Interact(nodes[i], props));

            if (props[0] && props[0] === 'load')
                this.triggers.load.push(new Trigger(nodes[i], props));

            this.elements.push(nodes[i]);
        }
    }

    //- events -//
    private onLoaded()
    {
        for (let i = 0, il = this.triggers.load.length; i < il; i++)
            this.triggers.load[i].update('load');
    }

    private onResize()
    {
        for (let i = 0, il = this.triggers.load.length; i < il; i++)
            this.triggers.load[i].update('resize');   
    }
}
new AnimationManager();