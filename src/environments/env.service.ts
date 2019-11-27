import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public sceibaApi = 'https://localhost:5000/api';
  public sceibaHost = '';
  public appHost = '';
  public appName = '';
  public pagesApi = '';

  constructor() { }
}
