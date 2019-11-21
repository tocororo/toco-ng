import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthenticateComponent } from './authenticate.component'
import { SharedModule } from '@toco/shared/shared.module';
import { AuthenticateRoutingModule } from './authenticate-routing.module'

@NgModule({
  declarations: [
    AuthenticateComponent
  ],
  exports: [
    AuthenticateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OAuthModule.forRoot(),
    AuthenticateRoutingModule
  ],
  providers: [
    
  ]
})
export class AuthenticateModule { }
