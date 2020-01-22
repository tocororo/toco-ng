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
  selector: 'toco-journal-home',
  templateUrl: './journal-home.component.html',
  styleUrls: ['./journal-home.component.scss']
})
export class JournalHomeComponent implements OnInit {

  constructor() { }
  public dataSource: MatTableDataSource<any>;

  public ngOnInit(): void
  {
      /* The `dataSource` */
      if (this.dataSource == undefined) this.dataSource = new MatTableDataSource(/*[ ]*/ELEMENT_DATA);
  }

}
