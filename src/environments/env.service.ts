import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public sceibaApi = '';
  public sceibaHost = '';
  public appHost = '';
  public appName = '';
  public pagesApi = '';
  
  constructor() { }
}
