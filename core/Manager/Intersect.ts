import { Config } from '@BEAST/Interface';
import { Trigger } from '@BEAST/Component';
export class Intersect
{
    observer: IntersectionObserver;
    options: any;

    elements: any = [];
    callbacks: any = [];
    constructor()
    {
        this.options = Config.intersect;
        this.observer = new IntersectionObserver(this.onIntersect.bind(this), this.options);
    }

    add(element, props)
    {
        this.elements.push(new Trigger(element, props));
        this.observer.observe(element);
    }

    onIntersect(entries)
    {
        for(var i = 0; i < entries.length; i++)
        {
            console.log(entries[i]);
            //let index = this.elements.indexOf(entries[i].target);
            //this.callbacks[index].call(entries[i]);
        }
    }

}