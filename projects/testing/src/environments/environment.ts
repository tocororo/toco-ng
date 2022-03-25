
import { Environment } from "projects/toco-lib/src/public-api";

class EnvironmentImpl implements Environment {
  production = false;
  sceibaHost = 'https://localhost:5000/';
  cuorHost = 'https://organizaciones.localhost:5000/';
  sceibaApi = 'https://localhost:5000/api/';
  cuorApi = 'https://organizaciones.localhost:5000/api/';

  appHost = 'https://localhost:4200';
  appName = 'Sceiba';

  websiteUsername_Twitter = '@SceibaCuba';
  websiteUsername_Facebook = '@sceiba';

  oauthRedirectUri = 'https://localhost:4200/';
  oauthClientId = 'uLYRoa4mN5870eBby4bElHkrzpDUPFlWTios9njy';
  oauthScope = 'user:email';
  topOrganizationPID = '';
  cachableUrls = [];

  matomoUrl = 'https://crai-stats.upr.edu.cu/';
  matomoSiteId = 7;


}

export const environment = new EnvironmentImpl();

export const allowedURLS = [environment.sceibaApi];
