import { Injectable } from '@angular/core';
import { MultischemeMode, VBRequestOptions } from '../entities/vocbench/vocbench';
import { ARTLiteral, ARTNode, ARTResource, ARTURIResource, RDFResourceRolesEnum, ResAttribute, ARTBNode, CustomFormValue } from "../entities/vocbench/ARTResources";
import { Observable } from 'rxjs';
import { Deserializer } from '../entities/vocbench/Deserializer';
import { User } from '../entities/vocbench/User';
import { VBContext } from '../entities/vocbench/VBContext';
import { HttpClient, HttpBackend, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { EnvService } from '@tocoenv/tools/env.service';
import { Config } from 'protractor';
import { Project } from '../entities/vocbench/vocbench';


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
  private getPostData(params: any): string {
    var postData: any;
    var strBuilder: string[] = [];
    for (var paramName in params) {
        var paramValue = params[paramName];
        if (paramValue == null) continue;
        if (Array.isArray(paramValue)) {
            let stringArray: string[] = [];
            for (var i = 0; i < paramValue.length; i++) {
                if (paramValue[i] instanceof ARTURIResource || paramValue[i] instanceof ARTBNode || paramValue[i] instanceof ARTLiteral) {
                    stringArray.push((<ARTNode>paramValue[i]).toNT());
                } else {
                    stringArray.push(paramValue[i]);
                }
            }
            strBuilder.push(encodeURIComponent(paramName) + "=" + encodeURIComponent(stringArray.join(",")));
        } else if (paramValue instanceof Map) {
            let stringMap: {[key: string]: string} = {};
            paramValue.forEach((value: any, key: string) => {
                if (value instanceof ARTURIResource || value instanceof ARTBNode || value instanceof ARTLiteral) {
                    stringMap[key] = value.toNT();
                } else {
                    stringMap[key] = value;
                }
            })
            strBuilder.push(encodeURIComponent(paramName) + "=" + encodeURIComponent(JSON.stringify(stringMap)));
        } else if (paramValue instanceof ARTURIResource || paramValue instanceof ARTBNode || paramValue instanceof ARTLiteral) {
            strBuilder.push(encodeURIComponent(paramName) + "=" + encodeURIComponent((<ARTNode>paramValue).toNT()));
        } else if (paramValue instanceof CustomFormValue) {
            strBuilder.push(encodeURIComponent(paramName) + "=" + encodeURIComponent(JSON.stringify(paramValue)));
        } else {
            strBuilder.push(encodeURIComponent(paramName) + "=" + encodeURIComponent(paramValue));
        }
    }
    postData = strBuilder.join("&");
    return postData;
}
  private readonly _httpOptions = {
        headers: new HttpHeaders({
			'Content-Type':'application/x-www-form-urlencoded',
            'Accept':'application/json'
        }),withCredentials: true
    };
  private url_basic = "http://127.0.0.1:1979/semanticturkey/it.uniroma2.art.semanticturkey/st-core-services/"
  
  login(email: string, password: string, rememberMe?: boolean): Observable<any> {
    var params: any = {
        email: email,
        password: password,
        _spring_security_remember_me: rememberMe
    }
        var postData = this.getPostData(params);
        console.log(postData)
        console.log(this._httpOptions);
        
    return this.http.post<any>(this.url_basic+"Auth/login",postData,this._httpOptions);
    
}

  /**
     * Returns the topConcepts of the given scheme
     * 
     * Note: timestamp is used in order to handle properly the correct response in case of multiple call to this service.
     * 
     * @param schemes
     * @return an array of top concepts
     */
    getTopConcepts(schemes?: string, schemeFilter?: string, 
      broaderProps?: string, narrowerProps?: string, includeSubProperties?: boolean, 
      options?: string): Observable<{ concepts: ARTURIResource[], timestamp: number }> {
      var params: any = {
          schemes: schemes,
          schemeFilter: schemeFilter,
          broaderProps: broaderProps,
          narrowerProps: narrowerProps,
          includeSubProperties: includeSubProperties,
          ctx_project:options
      };
      var url = this.url_basic + "SKOS/getTopConcepts?" + this.getPostData(params) + "&"

      return this.http.get<any>(url,this._httpOptions);
    //   return this.http.get("SKOS", "getTopConcepts", params, options).map(
    //       stResp => {
    //           return {
    //               concepts: Deserializer.createURIArray(stResp),
    //               timestamp: timestamp
    //           }
    //       }
    //   );
  
//http://127.0.0.1:1979/semanticturkey/it.uniroma2.art.semanticturkey/st-core-services/SKOS/getTopConcepts?schemes=<http://vocabularies.unesco.org/thesaurus>&schemeFilter=or&broaderProps=&narrowerProps=&includeSubProperties=true&options=UNESCO&
//http://127.0.0.1:1979/semanticturkey/it.uniroma2.art.semanticturkey/st-core-services/SKOS/getTopConcepts?schemes=<http://vocabularies.unesco.org/thesaurus>&schemeFilter=or&broaderProps=&narrowerProps=&includeSubProperties=true&ctx_project=UNESCO&
}

}
