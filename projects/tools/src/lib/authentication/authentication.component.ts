
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Subscription, PartialObserver, timer } from 'rxjs';

import { OAuthService, JwksValidationHandler, OAuthStorage, AuthConfig } from 'angular-oauth2-oidc';

import { AuthenticationService } from './authentication.service';
import { EnvService } from '@tocoenv/tools/env.service';

// import { authConfig } from './auth-config';

@Component({
    selector: 'toco-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, AfterViewInit {

    @Input()
    public isButtonLogin: boolean;

    private timerAuthenticateSuscription: Subscription = null;
    private timerAuthenticateObserver: PartialObserver<number> = {
        next: (_) => {

            this.oauthService.restartSessionChecksIfStillLoggedIn();
            if (this.oauthStorage.getItem('access_token')) {
                this.authenticationService.logguedChange(true);
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
        private env: EnvService,
        private oauthService: OAuthService,
        private oauthStorage: OAuthStorage,
        private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        if(this.isButtonLogin == undefined) this.isButtonLogin = false;

        this.configure();
        console.log('init');
    }

    ngOnDestroy(): void {
        if (this.timerAuthenticateSuscription) {
            this.timerAuthenticateSuscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        // this observable is to wait a while for the component to finish loading,
        // because otherwise it fails to notify that the user is authenticated
        this.timerAuthenticateSuscription = timer(0).subscribe(this.timerAuthenticateObserver);
    }

    /**
     * Configurations to authenticate
     */
    private configure() {
        const authConfig: AuthConfig = {

          // Url of the Identity Provider
          //issuer: 'https://sceiba-lab.upr.edu.cu',

          loginUrl: this.env.sceibaHost + 'oauth/authorize',

          tokenEndpoint: this.env.sceibaHost + 'oauth/token',

          // URL of the SPA to redirect the user to after login
          redirectUri: this.env.oauthRedirectUri,

          // The SPA's id. The SPA is registered with this id at the auth-server
          clientId: this.env.oauthClientId,

          oidc: false,

          timeoutFactor: 0.80,

          // set the scope for the permissions the client should request
          // The first three are defined by OIDC. The 4th is a usecase-specific one
          scope: this.env.oauthScope, //'openid profile email voucher',
      };
        this.oauthService.configure(authConfig);

        // Store user session in storage
        this.oauthService.setStorage(this.oauthStorage);

        this.oauthService.tokenValidationHandler = new JwksValidationHandler();

        // Try to login and if a token was received, request user information
        this.oauthService.tryLogin({
            onTokenReceived: (_) => {
                // gives information about user loggued
                this.authenticationService.getUserInfo().subscribe(response => {
                    // save email in storage
                    this.oauthStorage.setItem('email', response.data.userprofile.email);

                    // notifies user is logged
                    this.authenticationService.logguedChange(true);

                    console.debug(this.oauthStorage.getItem('access_token'));
                });
            },
            onLoginError: err => {
                console.log('errorr in login', err);

            }
        });

        this.oauthService.events.subscribe(e => {
            switch (e.type) {
                case 'token_received':
                    console.log('token received');
                    break;
                case 'token_expires':
                    console.log('token expires');
                    this.oauthService.initImplicitFlow();
                    break;
                case 'logout':
                    console.log('logout');
                    break;
                default:
                    break;
            }
        });
    }

    /**
     * Starts the login flow
     */
    public login() {
        this.oauthService.initImplicitFlow();
    }

    /**
     * Ends the login flow
     */
    public logoff() {
        this.oauthService.logOut();
        this.authenticationService.logguedChange(false);
    }

    /**
     * Gives the user's email if the user is authenticated
     */
    public get name() {
        if (this.oauthStorage.getItem('access_token')) {
            return this.oauthStorage.getItem('email');
        } else {
            return null;
        }

    }
}
