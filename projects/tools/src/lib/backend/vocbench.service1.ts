import { Injectable } from '@angular/core';
import { MultischemeMode, VBRequestOptions } from '../entities/vocbench/vocbench';
import { ARTLiteral, ARTNode, ARTResource, ARTURIResource, RDFResourceRolesEnum, ResAttribute } from "../entities/vocbench/ARTResources";
import { Observable } from 'rxjs';
import { Deserializer } from '../entities/vocbench/Deserializer';
import { User } from '../entities/vocbench/User';
import { VBContext } from '../entities/vocbench/VBContext';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { EnvService } from '@tocoenv/tools/env.service';


@Injectable({
  providedIn: 'root'
})
export class VocbenchService {

  http: HttpClient;
	constructor(private env: EnvService, private handler: HttpBackend) {

		// TODO: hay una mejor manera de hacer esto, creando diferentes y propios HttpClients que
		// tengan un comportamiento especifico (eg: sin/con autenticacion)
		// ver: https://github.com/angular/angular/issues/20203#issuecomment-369754776
		// otra solucion seria pasar parametros especiales como {ignore_auth = true} y que el
		// interceptor actue en consecuencia... .
		// https://github.com/angular/angular/issues/18155#issuecomment-382438006

		this.http = new HttpClient(handler);
  }
  
  private url_basic = "http://127.0.0.1:1979/semanticturkey/it.uniroma2.art.semanticturkey/st-core-services/"
  login(email: string, password: string, rememberMe?: boolean): Observable<User> {
    var params: any = {
        email: email,
        password: password,
        _spring_security_remember_me: rememberMe
    }
    console.log(params)
    var options: VBRequestOptions = new VBRequestOptions({ errorAlertOpt: { show: false } });
    return this.http.post<User>(this.url_basic+"Auth/login",params)
    // return this.httpMgr.doPost("Auth", "login", params, options).map(
    //     stResp => {
    //         var loggedUser: User = Deserializer.createUser(stResp);
    //         VBContext.setLoggedUser(loggedUser);
    //         return loggedUser;
    //     }
    // );

}

  /**
     * Returns the topConcepts of the given scheme
     * 
     * Note: timestamp is used in order to handle properly the correct response in case of multiple call to this service.
     * 
     * @param schemes
     * @return an array of top concepts
     */
  //   getTopConcepts(timestamp: number, schemes?: ARTURIResource[], schemeFilter?: MultischemeMode, 
  //     broaderProps?: ARTURIResource[], narrowerProps?: ARTURIResource[], includeSubProperties?: boolean, 
  //     options?: VBRequestOptions): Observable<{ concepts: ARTURIResource[], timestamp: number }> {
  //     var params: any = {
  //         schemes: schemes,
  //         schemeFilter: schemeFilter,
  //         broaderProps: broaderProps,
  //         narrowerProps: narrowerProps,
  //         includeSubProperties: includeSubProperties
  //     };
  //     return this.http.doGet("SKOS", "getTopConcepts", params, options).map(
  //         stResp => {
  //             return {
  //                 concepts: Deserializer.createURIArray(stResp),
  //                 timestamp: timestamp
  //             }
  //         }
  //     );
  // }
}
