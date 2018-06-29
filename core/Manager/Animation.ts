import { Config } from '@BEAST/Interface';
import { Trigger, Scroll, ScrollFixed, ScrollTo } from '@BEAST/Component';
import { Debug } from '@BEAST/Component/Debug';

export class AnimationManager
{
    public elements: Element[];
    public triggers: any;

    constructor()
    {
        this.elements = [];
        this.triggers = {scroll: [],load: []};
        this.process();

        if (document.readyState === "complete" || document.readyState !== "loading")
            this.ELoaded();
        else
            document.addEventListener("DOMContentLoaded", this.ELoaded.bind(this));

        window.addEventListener("scroll", this.EScroll.bind(this));
        window.addEventListener("resize", this.EResize.bind(this));
    }

    private process()
    {
        let nodes = document.querySelectorAll("[beast]");
        for (let i = 0, il = nodes.length; i < il; i++)
        {
            let props = nodes[i].getAttribute('beast').split("|");
            if(props[0] && nodes[i].tagName === "BODY")
            {
                Config.viewport.top = (props[0]) ? Number(props[0]) : 0;
                Config.viewport.bottom = (props[1]) ? Number(props[1]) : 0;
                Config.viewport.left = (props[2]) ? Number(props[2]) : 0;
                Config.viewport.right = (props[3]) ? Number(props[3]) : 0;
                Config.debug = (props[4] && props[4] === "true") ? true : false;

                if(Config.debug)
                    new Debug(nodes[i], "viewport");
            }

            if (props[0] && props[0] === 'Scroll')
                this.triggers.scroll.push(new Scroll(nodes[i], props));

            if (props[0] && props[0] === 'ScrollFixed')
                this.triggers.scroll.push(new ScrollFixed(nodes[i], props));

            if (props[0] && props[0] === 'ScrollTo')
                this.triggers.scroll.push(new ScrollTo(nodes[i], props));

            if (props[0] && props[0] === 'Load')
                this.triggers.load.push(new Trigger(nodes[i], props));

            this.elements.push(nodes[i]);
        }
    }

    //- events -//
    private EScroll(event)
    {
        for (let i = 0, il = this.triggers.scroll.length; i < il; i++)
            this.triggers.scroll[i].update('scroll', { x: event.pageX, y: event.pageY });
    }

    private ELoaded()
    {
        for (let i = 0, il = this.triggers.load.length; i < il; i++)
            this.triggers.load[i].update('load');
    }

    private EResize()
    {
        for (let i = 0, il = this.triggers.scroll.length; i < il; i++)
            this.triggers.scroll[i].update('resize');

        for (let i = 0, il = this.triggers.load.length; i < il; i++)
            this.triggers.load[i].update('resize');   
    }
}
new AnimationManager();