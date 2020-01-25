
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { TableContent } from '@toco/tools/forms';

export interface PeriodicElement
{
    titulo: string;
    issn: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { titulo: 'Hydrogen', issn: 1 },
    { titulo: 'Helium', issn: 2 },
    { titulo: 'Lithium', issn: 3 },
    { titulo: 'Beryllium', issn: 4 },
    { titulo: 'Boron', issn: 5 },
    { titulo: 'Carbon', issn: 6 },
    { titulo: 'Nitrogen', issn: 7 },
    { titulo: 'Oxygen', issn: 8 },
    { titulo: 'Fluorine', issn: 9 },
    { titulo: 'Neon', issn: 10},
    { titulo: 'Hydrogen', issn: 11 },
    { titulo: 'Helium', issn: 12 },
    { titulo: 'Lithium', issn: 13 },
    { titulo: 'Beryllium', issn: 14 },
    { titulo: 'Boron', issn: 15 },
    { titulo: 'Carbon', issn: 16 },
    { titulo: 'Nitrogen', issn: 17 },
    { titulo: 'Oxygen', issn: 18 },
    { titulo: 'Fluorine', issn: 19 },
    { titulo: 'Neon', issn: 20}
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    title = 'Registro de Publicaciones Científicas';

    // TODO: Parametrizar usando el vocabulario 'organismos', en el primer nivel tiene los organismos de nivel
    // superior, en principio esta app puede usarse para otros osde
    organization = 'Ministerio de Educación Superior';

    /**
     * The journals list. 
     */
    public content: TableContent;

    public constructor()
    { }

    public ngOnInit(): void
    {
        this.content = {
            /* Initializes the `dataSource`. */
            //'dataSource': new MatTableDataSource([ ]),
            'dataSource': new MatTableDataSource(ELEMENT_DATA),
            'columnsObjectProperty': ['titulo', 'issn'],
            'columnsHeaderText': ['Título', 'ISSN'],
            'propertyNameToNavigate': "---"/*"uuid"*/,
            'pageSize': 10,
            'hidePageSize': true,
            'showFirstLastButtons': true
        };
    }
}
