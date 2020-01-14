
import { Injectable, Output, EventEmitter } from '@angular/core';

export interface FormSuscriberInterface
{
    newEntity(data: any): void;
}

@Injectable()
export class FormsService
{
    @Output()
    public addData: EventEmitter<any> = new EventEmitter();

    public constructor()
    { }

    public emitData(value?: any, emitEvent: boolean = true): void
    {
        if (emitEvent)
        {
            this.addData.emit(value);
        }
    }
}
