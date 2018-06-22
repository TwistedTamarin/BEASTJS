import { Trigger } from '@BEAST/Component/Trigger';
import { IPosition } from '@BEAST/Interface';

export class Interact extends Trigger
{
    public position: IPosition;
    constructor(element: Element, data: any)
    {
        super(element, data);
        //@TODO : create interaction class;
    }

    public update(event?: string, data?: any)
    {
    }
}