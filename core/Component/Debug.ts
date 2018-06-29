import {Config} from '@BEAST/Interface';

export class Debug
{    
    root: any;
    pos: any;
    type: string;

    constructor(root: any, type?: string)
    {
        this.root = root;
        this.type = type;

        if(this.type === "viewport")
            this.createViewport();
        else
            this.root.classList.add("beast-debug");
    }

    createViewport()
    {
        var pos = {
            top: this.root.offsetTop + Config.viewport.top,
            bottom: window.innerHeight - Config.viewport.bottom,
            left: this.root.offsetLeft + Config.viewport.left,
            right: (this.root.offsetLeft + window.innerWidth) - Config.viewport.right 
        }
        this.createLines(pos);
    }

    createLines(pos)
    {
        var top = this.createLine(pos.top, "H");
        var bottom = this.createLine(pos.bottom, "H");
        var left = this.createLine(pos.left, "V");
        var right = this.createLine(pos.right, "V");
    
        this.root.appendChild(top);
        this.root.appendChild(bottom);
        this.root.appendChild(left);
        this.root.appendChild(right);
    }

    createLine(pos, type)
    {
        var line = document.createElement("div");
        line.classList.add("beast-debug", this.type, type);
        if(type === "H")
            line.style.top = pos + "px";
        else 
            line.style.left = pos + "px";
        return line; 
    }
}