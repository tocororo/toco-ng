import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { PagesService } from './pages.service';


@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(private service: PagesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let slug = route.paramMap.get('slug');
    console.log(slug);
    return this.service.getPageBySlug(slug).pipe(
      take(1),
      map(node => {
        if (node) {
          console.log(node);
          return node;
        } else { // id not found
          this.router.navigate(['/']);
        }
      })
    );
  }
}
