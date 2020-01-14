
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'toco-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit
{
    @Input()
    menuItems: MenuItem[];

    constructor()
    { }

    ngOnInit()
    { }
}

export interface MenuItem
{
    link: string;
    label: string;
}
