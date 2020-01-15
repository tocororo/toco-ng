
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class FilterContainerService {

    @Output() emitter: EventEmitter<number> = new EventEmitter();
    
    constructor()
    { }

    filterDeleted(filterIndex:number): void{
        this.emitter.emit(filterIndex);
    }
}
