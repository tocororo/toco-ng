/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

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

    public title = 'Directorio MES';

    public isOnline: boolean;

    public islogged: boolean;

    public user: any;

    public loading = true;

    public footerSites: Array< { name: string, url: string, useRouterLink: boolean } >;

    public footerInformation: Array< { name: string, url: string, useRouterLink: boolean } >;

    // public footerImage: string

    private authenticateSuscription: Subscription = null;
    private authenticateObserver: PartialObserver<boolean> = {
        next: (islogged: boolean) => {
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

        // this.footerImage = 'https://10.2.83.160:5000/static/images/sceiba-logo-white.png';
        this.footerInformation =  Array();
        this.footerSites =  Array();

        this.footerSites.push({ name: "MES", url: "https://www.mes.gob.cu", useRouterLink: false});
        this.footerSites.push({ name: "Sceiba", url: "https://sceiba-lab.upr.edu.cu", useRouterLink: false});
        this.footerSites.push({ name: "Dirección Nacional de Publicaciones Seriadas", url: "http://www.seriadascubanas.cult.cu/http://www.seriadascubanas.cult.cu/", useRouterLink:false});
        this.footerSites.push({ name: "Red Ciencia", url: "http://www.redciencia.cu/", useRouterLink: false});

        this.footerInformation.push({ name: "Términos de uso", url: "https://www.mes.gob.cu", useRouterLink: false});
        this.footerInformation.push({ name: "Privacidad", url: "https://sceiba-lab.upr.edu.cu", useRouterLink: false});
        this.footerInformation.push({ name: "Contacto", url: "/contact", useRouterLink: true});
        this.footerInformation.push({ name: "FAQs", url: "/faq", useRouterLink: true});
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
