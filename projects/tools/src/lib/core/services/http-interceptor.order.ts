
/* "Barrel" of Http Interceptors.
 * Angular applies interceptors in the order that you provide them. If you provide interceptors A,
 * then B, then C, requests will flow in A->B->C and responses will flow out C->B->A.
 * You cannot change the order or remove interceptors later. If you need to enable and disable
 * an interceptor dynamically, you'll have to build that capability into the interceptor itself. */

import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { AuthenticationService } from '@toco/tools/authentication';

import { CachingInterceptor } from './http.interceptor';

/**
 * Http interceptor providers in order.
 */
export const HTTP_INTERCEPTOR_PROVIDERS = [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthenticationService, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
];
