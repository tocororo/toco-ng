/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { Term } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public organizationUUID: string
    constructor(private env: EnvService) {
    }

    ngOnInit() {
        this.organizationUUID = this.env.extraArgs['organizationUUID'];
    }

}