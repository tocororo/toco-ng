import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { Subscription, PartialObserver, timer } from "rxjs";

import {
  OAuthService,
  JwksValidationHandler,
  OAuthStorage,
  AuthConfig,
} from "angular-oauth2-oidc";

import { AuthBackend, OauthAuthenticationService } from "./authentication.service";
import { EnvService } from "../backend/env.service";
import { Router } from "@angular/router";
import { UserProfileService } from "../backend/public-api";
import { UserProfile } from "../entities/public-api";

// import { authConfig } from './auth-config';
export interface OauthInfo{
  serverHost: string;
  loginUrl: string;
  tokenEndpoint: string;
  userInfoEndpoint: string,
  appHost: string;
  appName: string;
  oauthRedirectUri: string;
  oauthClientId: string;
  oauthScope: string;
}
@Component({
  selector: "toco-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"],
})
export class AuthenticationComponent implements OnInit, AfterViewInit {

  @Input()
  public isButtonLogin: boolean;

  @Input()
  public isButtonLoginIcon: boolean;

  @Input()
  public isButtonLoginText: string;

  @Input()
  public oauthInfo: OauthInfo;

  public user: UserProfile;

  public userName: string;
  private timerAuthenticateSuscription: Subscription = null;
  private timerAuthenticateObserver: PartialObserver<number> = {
    next: (_) => {
      // console.log('next');
      // this.oauthService.setupAutomaticSilentRefresh();
      if (this.oauthStorage.getItem("access_token")) {
        this.authenticationService.getUserInfo().subscribe(
          (response) => {
            this.oauthStorage.setItem("user", JSON.stringify(response));
            this.authenticationService.login(response);
          },
          error => console.log(error),
          () => {}
        )
        // this.authenticationService.logguedChange(true);
      }
    },

    error: (err: any) => {
      console.log("The observable got an error notification: " + err + ".");
    },

    complete: () => {
      console.log("The observable got a complete notification.");
    },
  };

  constructor(
    private userProfileService: UserProfileService,
    private env: EnvService,
    private oauthService: OAuthService,
    private oauthStorage: OAuthStorage,
    private authenticationService: OauthAuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.isButtonLogin == undefined) this.isButtonLogin = false;
    if (this.isButtonLoginIcon == undefined) this.isButtonLoginIcon = false;
    if (this.isButtonLoginText == undefined) this.isButtonLoginText = "Login";
    if (this.oauthInfo.loginUrl == undefined || this.oauthInfo.loginUrl == ''){
      this.oauthInfo.loginUrl = this.oauthInfo.serverHost + "oauth/authorize";
    }
    if (this.oauthInfo.tokenEndpoint == undefined || this.oauthInfo.tokenEndpoint == ''){
      this.oauthInfo.tokenEndpoint = this.oauthInfo.serverHost + "oauth/token";
    }
    this.configure();
  }

  ngOnDestroy(): void {
    if (this.timerAuthenticateSuscription) {
      this.timerAuthenticateSuscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // this observable is to wait a while for the component to finish loading,
    // because otherwise it fails to notify that the user is authenticated
    this.timerAuthenticateSuscription = timer(0).subscribe(
      this.timerAuthenticateObserver
    );
  }

  /**
   * Configurations to authenticate
   */
  private configure() {
    const authConfig: AuthConfig = {
      // Url of the Identity Provider
      //issuer: 'https://sceiba-lab.upr.edu.cu',

      loginUrl: this.oauthInfo.loginUrl,

      tokenEndpoint: this.oauthInfo.tokenEndpoint,

      // URL of the SPA to redirect the user to after login
      redirectUri: this.oauthInfo.oauthRedirectUri,

      // The SPA's id. The SPA is registered with this id at the auth-server
      clientId: this.oauthInfo.oauthClientId,

      oidc: false,

      // silentRefreshRedirectUri: this.oauthInfo.sceibaHost + 'oauth/token',

      // timeoutFactor: 0.75,

      sessionChecksEnabled: true,
      // set the scope for the permissions the client should request
      // The first three are defined by OIDC. The 4th is a usecase-specific one
      scope: this.oauthInfo.oauthScope, //'openid profile email voucher',
    };
    this.oauthService.configure(authConfig);

    // Store user session in storage
    // this.oauthService.setStorage(this.oauthStorage);

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // Try to login and if a token was received, request user information
    this.oauthService.tryLogin({
      onTokenReceived: (_) => {
        // gives information about user loggued
        this.authenticationService.userInfoEndpoint = this.oauthInfo.userInfoEndpoint;
        this.authenticationService.getUserInfo().subscribe(

            (response) => {
              this.oauthStorage.setItem("user", JSON.stringify(response));
              this.authenticationService.login(response);
            },
            error => console.log(error),
            () => {}


          // (response) => {
          // this.oauthStorage.setItem("user", JSON.stringify(response));
          // // // save email in storage
          // // if (this.authBackend == AuthBackend.cuor){
          // //   this.oauthStorage.setItem("email", response.email);
          // // }else{
          // //   this.oauthStorage.setItem("email", response.data.userprofile.user.email);
          // // }
          // // this.oauthStorage.setItem('userID', response.data.userprofile.id);

          // // notifies user is logged
          // this.authenticationService.logguedChange(true);

          // this.userName = this.oauthStorage.getItem("email");

        // }
        );
      },
      onLoginError: (err) => {
        console.log("errorr in login", err);
      },
    });
  }

  /**
   * Starts the login flow
   */
  public login() {
    this.oauthService.initImplicitFlow();
    // this.authenticationService.authBackend = this.authBackend
    // TODO: por que esto aqui, este modulo solo se encarga de la autenticacion y dar la informacion basica del usuario,
    // el perfil es manejado por otro componente
    this.user = new UserProfile();
    this.userProfileService.getUserInfo().subscribe({
      next: (response) => {
        if (response && response.data && response.data.userprofile) {
          this.user.deepcopy(response.data.userprofile);
          this.oauthStorage.setItem("profile", this.user.entitystringify());
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  /**
   * Ends the login flow
   */
  public logoff() {
    this.oauthService.logOut();
    this.authenticationService.logout();
  }

  /**
   * Gives the user's email if the user is authenticated
   */
  public get name() {
    if (this.oauthStorage.getItem("access_token")) {
      return this.oauthStorage.getItem("email");
    } else {
      return null;
    }
  }
}
