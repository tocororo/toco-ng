
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

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
    { titulo: 'Neon', issn: 10}
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

    public dataSource: MatTableDataSource<any>;

    public ngOnInit(): void
    {
        /* The `dataSource` */
        if (this.dataSource == undefined) this.dataSource = new MatTableDataSource(/*[ ]*/ELEMENT_DATA);
    }

    /**
     * Returns true if the data source is empty; otherwise, false. 
     */
    public get isEmpty(): boolean
    {
        return (this.dataSource.data.length == 0);
    }
}
