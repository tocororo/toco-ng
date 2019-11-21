import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  //issuer: 'https://sceiba-lab.upr.edu.cu',

  loginUrl: 'https://sceiba-lab.upr.edu.cu/oauth/authorize',

  tokenEndpoint: 'https://sceiba-lab.upr.edu.cu/oauth/token',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'https://127.0.0.1:4200/authorized',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'CYwMR6XfOSim5zcTxf98mv9bYEEKNLbMRT4K9h4n',
  
  oidc: false,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'user:email', //'openid profile email voucher',
}