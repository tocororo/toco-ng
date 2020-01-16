
import { Component } from '@angular/core';
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { Subscription, PartialObserver } from 'rxjs';

@Component({
    selector: 'toco-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'toco';
    isOnline: boolean;
    islogged: boolean;
    user: any;

    private authenticateSuscription: Subscription = null;
    private authenticateObserver: PartialObserver<boolean> = {
        next: (islogged: boolean) => {
            this.islogged = islogged;
            console.log(islogged);
            
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

    constructor(private oauthStorage: OAuthStorage, private oauthService: OAuthService, private authenticateService: AuthenticationService) {
        this.isOnline = true; //navigator.onLine;
    }
    ngOnInit(): void {
        console.log('3213213213131313231');
        
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
