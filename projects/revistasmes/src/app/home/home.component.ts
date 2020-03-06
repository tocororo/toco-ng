import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator()}
  ]
})
export class HomeComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
  }

}
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';

  return customPaginatorIntl;
}
