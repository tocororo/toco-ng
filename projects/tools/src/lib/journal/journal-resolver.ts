
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { SourceService } from '@toco/tools/backend';
import { Journal } from '@toco/tools/entities';

@Injectable()
export class JournalResolver implements Resolve<Journal>
{
    constructor(private service: SourceService, private router: Router)
    { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let uuid = route.paramMap.get('uuid');
        console.log('resolve');
        return this.service.getSourceByUUID(uuid).pipe(
            take(1),
            map(node => {
                if (node) {
                    return node;
                } else {
                    this.router.navigate(['/journal']);
                }
            })
        );
    }
}
