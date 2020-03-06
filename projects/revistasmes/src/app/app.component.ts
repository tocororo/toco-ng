import { Component } from '@angular/core';
import { Subscription, PartialObserver } from 'rxjs';
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { Router, NavigationStart, RouterEvent, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Directorio MES';
    isOnline: boolean;
    islogged: boolean;
    user: any;
    loading = true;
    private authenticateSuscription: Subscription = null;
    private authenticateObserver: PartialObserver<boolean> = {
        next: (islogged: boolean) => {
            console.log(this.oauthStorage);

            this.islogged = islogged;
            if (this.oauthStorage.getItem('access_token')) {
                this.user = this.oauthStorage.getItem('email');
            }
        },

        error: (err: any) => {
            console.log('The observable got an error notification: ' + err + '.');
        },

        complete: () => {
            console.log('The observable got a complete notification.');
        }
    };

    constructor(
        private oauthStorage: OAuthStorage,
        private oauthService: OAuthService,
        private authenticateService: AuthenticationService,
        private router: Router) {

        this.isOnline = true; //navigator.onLine;
        this.router.events.subscribe(
            (event: RouterEvent) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                }

                if (event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError) {
                    this.loading = false;
                    console.log(this.loading);
                    
                }
            },
            (error: any) => {

            },
            () => {

            }
        );
    }
    ngOnInit(): void {
        this.authenticateSuscription = this.authenticateService.authenticationSubjectObservable
            .subscribe(this.authenticateObserver);
    }

    ngOnDestroy(): void {
        if (this.authenticateSuscription) {
            this.authenticateSuscription.unsubscribe();
        }
    }

    public logoff() {
        this.oauthService.logOut();
        this.oauthStorage.removeItem('email');
        this.authenticateService.logguedChange(false);
    }
}
