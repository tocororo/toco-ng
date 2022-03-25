
import { Component, Input, OnInit } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthErrorEvent, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

import { Environment } from '../env';
import { Response } from '../services/http.service';

@Component({
    selector: 'toco-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    /**
     * Input field that contains the router link to reditect for the logo. 
     * By default, its value is `['/']`. 
     */
    @Input()
    public logoRouterLink: string[];
 
    /**
     * Input field that contains the image source to show the logo. 
     * By default, its value is `undefined`. 
     */
    @Input()
    public logoImgSource: string;

    public constructor(private env: Environment,
        private oauthService: OAuthService)
    {
        this.logoRouterLink = undefined;
        this.logoImgSource = undefined;
    }

    public ngOnInit(): void
    {
        /* Specifies the default values. */

        if (this.logoRouterLink == undefined) this.logoRouterLink = ['/'];
        /* The default value for `logoImgSource` is `undefined`. */

        /* this.urlLogin = this.env.sceibaHost + "login";
        this.urlSignUp = this.env.sceibaHost + "signup"; */

        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
            console.error(event);
            } else {
            console.warn("EVENT:", event);
            if (event.type == 'token_received') {
                this.getUserInfo().subscribe({
                next: (response) => {
                    console.log(response)
                },
    
                error: (e) => { },
    
                complete: () => { },
                });
            }
            }
        });

        if (this.oauthService.getAccessToken())
        {
            this.getUserInfo().subscribe({
                next: (response) => {
                    console.log(response)
                },
        
                error: (e) => { },
        
                complete: () => { },
            });
        }
    }

    public getUserInfo(): Observable<Response<any>>
    {
        // let token = this.oauthStorage.getItem('access_token');
        // let headers = new HttpHeaders()
        // headers.set('Authorization', 'Bearer ' + token);
        // headers = headers.set('Content-Type', 'application/json');
        // headers = headers.set('Access-Control-Allow-Origin', '*');
        // const options = {
        //   headers: headers
        // };
        return this.http.get<Response<any>>(this.env.sceibaApi + 'me');
    }

    public me(): void
    {
        this.getUserInfo().subscribe({
            next: (response) => {
                console.log(response)
            },

            error: (e) => { },

            complete: () => { },
        });
    }
}
