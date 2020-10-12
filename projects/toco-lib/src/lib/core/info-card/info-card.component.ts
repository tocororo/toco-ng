
import { Component, OnInit, Input } from '@angular/core';

import { Entity } from '../../entities';

@Component({
    selector: 'toco-info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

    @Input() avatar_card ;
    @Input() title_card: String ;
    @Input() subtitle_card: String ;
    @Input() content_card: String ;
    @Input() img_card: String;
    @Input() router : String ;
    @Input() entity: Entity;
    
    is_avatar_card: Boolean = false;
    is_title_card: Boolean = false;
    is_subtitle_card: Boolean = false;
    is_content_card: Boolean = false;
    is_img_card: Boolean = false;
    @Input() is_actions_card: Boolean = false;

    constructor()
    { }

    ngOnInit() {
        if (typeof(this.avatar_card) != 'undefined') this.is_avatar_card = true;
        if (this.content_card != ' ') this.is_content_card = true;
        if (this.title_card != ' ') this.is_title_card = true;
        if (this.subtitle_card != ' ') this.is_subtitle_card = true;
        if (typeof(this.img_card) != 'undefined') this.is_img_card = true;
    }

    // show_people(){
    //   var p = new PeopleShowComponent();
    //   p.people = this.object_to_show;
    // }
}
