import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'toco-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrls: ['./taxonomy.component.scss']
})
export class TaxonomyComponent {

  vocabs = { title: 'Vocabularies', cols: 1, rows: 1 };
  /** Based on the screen size, switch from standard to one column per row */
  // vocabs = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Vocabularies', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Vocabularies', cols: 1, rows: 1 }
  //     ];
  //   })
  // );
  /** Based on the screen size, switch from standard to one column per row */
  terms = { title: 'Terms', cols: 1, rows: 2 };
  // terms = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Terms', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Terms', cols: 1, rows: 2 }
  //     ];
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
