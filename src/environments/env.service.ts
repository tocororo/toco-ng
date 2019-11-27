import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public sceibaApi = 'https://sceiba-lab.upr.edu.cu/api';
  public sceibaHost = '';
  public appHost = '';
  public appName = '';
  public pagesApi = '';

  constructor() { }
}
