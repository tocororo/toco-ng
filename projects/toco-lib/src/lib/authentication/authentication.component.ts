import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthConfig, OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { JwksValidationHandler } from "angular-oauth2-oidc-jwks";
import { PartialObserver, Subscription, timer } from "rxjs";

import { UserProfileService } from "../backend/user-profile.service";
import { Environment } from "../core/env";
import { UserProfile } from "../entities/person.entity";
import { OauthAuthenticationService } from "./authentication.service";
// import { authConfig } from './auth-config';

export interface OauthInfo {
  serverHost: string;
  loginUrl: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
  appHost: string;
  appName: string;
  oauthRedirectUri: string;
  oauthClientId: string;
  oauthScope: string;
}

/**
 * Represents a component used to authenticate.
 *
 * In order to use this component with the correct i18n, you must include
 * (in your i18n translate files that are in the folder `assets\i18n`)
 * a translation key of name "TOCO_AUTHENTICATION" that contains
 * an object as value with the translation needed by this component.
 *
 * In the case of `es.json` file, you must include the following translation key:
    "TOCO_AUTHENTICATION": {
        "MAT_CARD_TITLE_AUTH": "Autenticación con",
        "AUTENTICARSE": "Autenticarse",
        "H1_HOLA": "Hola",
        "BUTTON_SALIR": "Salir"
    }
 *
 * In the case of `en.json` file, you must include the following translation key:
    "TOCO_AUTHENTICATION": {
        "MAT_CARD_TITLE_AUTH": "Authentication with",
        "AUTENTICARSE": "Log in",
        "H1_HOLA": "Hello,",
        "BUTTON_SALIR": "Exit"
    }
 *
 * If you have another language, then you have another `*.json` file,
 * and you must include the "TOCO_AUTHENTICATION" translation key with the correct translation values.
 */
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

  public userProfile: UserProfile;

  public userName: string;
  private timerAuthenticateSuscription: Subscription = null;
  private timerAuthenticateObserver: PartialObserver<number> = {

    next: (_) => {
      console.log('next Timer');
      // this.oauthService.setupAutomaticSilentRefresh();
      if (this.oauthStorage.getItem("access_token")) {
        console.log("access_token: ", this.oauthStorage.getItem("access_token"));

        this.getUserInfo();
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
    private env: Environment,
    private router: Router,
    private oauthService: OAuthService,
    private oauthStorage: OAuthStorage,
    private authenticationService: OauthAuthenticationService,
    private _transServ: TranslateService
  ) {}

  ngOnInit() {
    if (this.isButtonLogin == undefined) this.isButtonLogin = false;
    if (this.isButtonLoginIcon == undefined) this.isButtonLoginIcon = false;
    if (this.isButtonLoginText == undefined) {
      this._transServ
        .get("TOCO_AUTHENTICATION.AUTENTICARSE")
        .subscribe((res: string) => {
          this.isButtonLoginText = res;
        });
    }
    if (this.oauthInfo.loginUrl == undefined || this.oauthInfo.loginUrl == "") {
      this.oauthInfo.loginUrl = this.oauthInfo.serverHost + "oauth/authorize";
    }
    if (
      this.oauthInfo.tokenEndpoint == undefined ||
      this.oauthInfo.tokenEndpoint == ""
    ) {
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
        this.getUserInfo();
      },
      onLoginError: (err) => {
        // console.log("error in login", err);
      },
    });
  }

  private getUserInfo() {
    this.authenticationService.userInfoEndpoint =
      this.oauthInfo.userInfoEndpoint;
    this.authenticationService.getUserInfo().subscribe(
      (responseUser) => {
        // this.oauthStorage.setItem("user", JSON.stringify(responseUser));
        this.authenticationService.saveResponseUserToStorage(responseUser)
        this.authenticationService.login(responseUser);

        // this.userProfileService.getUserInfo().subscribe({
        //   next: (responseProfile) => {
        //     console.log("    this.userProfileService.getUserInfo().subscribe(....",responseProfile);

        //     if (responseProfile && responseProfile.data && responseProfile.data.userprofile) {
        //       this.userProfile.deepcopy(responseProfile.data.userprofile);
        //       console.log(
        //         "this.authenticationService.getUserInfo()*********************",
        //         responseProfile
        //       );

        //     }
        //   },
        //   error: (err) => {
        //     // console.log(err);
        //   },
        //   complete: () => {
        //   },
        // });

      },
      (
          error // console.log(error),
        ) =>
        () => {}
    );
  }

  /**
   * Starts the login flow
   */
  public login() {
    console.log(
      "login *****************initImplicitFlow ****   ",
    );

    this.oauthService.initImplicitFlow();
    this.getUserInfo();
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
