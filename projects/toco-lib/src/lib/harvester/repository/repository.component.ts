
import { Component, OnInit, Input } from '@angular/core';

import { Journal } from '../../entities/public-api';

@Component({
    selector: 'toco-harvester-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

    @Input() repostitory: Journal;

    constructor()
    { }

    ngOnInit() {
    }

    onIdentify(){
        console.log('onIdentify'+this.repostitory.id);
    }
    
    onHarvest(){
        console.log('onHarvest'+this.repostitory.id);
    }

    onRecord(){
        console.log('onRecord'+this.repostitory.id);
    }
}
