import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { JournalService } from './journal.service';
import { Journal } from '../entities/journal.entity';


@Injectable()
export class JournalResolver implements Resolve<Journal> {
  constructor(private service: JournalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Journal> {
    let id = route.paramMap.get('id');
    return this.service.getJournalsById(id).pipe(
      take(1),
      map(node => {
        if (node) {
          return node;
        } else {
          this.router.navigate(['/']);
        }
      })
    );
  }
}