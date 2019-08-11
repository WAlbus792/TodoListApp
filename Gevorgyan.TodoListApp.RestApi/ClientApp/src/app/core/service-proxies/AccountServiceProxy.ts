
// for AUTO-GENERATION!

import { ServiceProxyBase, API_BASE_URL, FileContentResult } from "./service-proxy-base";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { DataSourceRequestState} from "@progress/kendo-data-query";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { UserSessionProvider } from "../user-session-provider";

import * as moment from 'moment';

import { AuthenticateUserResultModel } from '../models/AuthenticateUserResultModel'
import { AuthenticateUserInputModel } from '../models/AuthenticateUserInputModel'

export class AccountServiceProxy extends ServiceProxyBase {
    
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(
        private session: UserSessionProvider,
        @Inject(API_BASE_URL) private baseUrl: string,
        private http: HttpClient
    ) {
        super(session, baseUrl, http);
    }

    
    

    authenticate(input: AuthenticateUserInputModel): Observable<AuthenticateUserResultModel | null> {
        let url_ = this.baseUrl + "/api/Account/";
        

        
        const content_ = JSON.stringify(input);
        

        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return Observable.fromPromise(this.transformOptions(options_)).flatMap(transformedOptions_ => {
            return this.http.request("post", url_, transformedOptions_);
        }).flatMap((response_: any) => {
            return this.processAuthenticate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuthenticate(<any>response_);
                } catch (e) {
                    return <Observable<AuthenticateUserResultModel | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<AuthenticateUserResultModel | null>><any>Observable.throw(response_);
        });
    }

    protected processAuthenticate(response: HttpResponseBase): Observable<AuthenticateUserResultModel | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            
            
            
            return this.blobToText(responseBlob).flatMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                
            result200 = resultData200 ? AuthenticateUserResultModel.fromJS(resultData200) : <any>null;
            
            return Observable.of(result200);
            });
            
        } 
        else if (status !== 200 && status !== 204) {
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<AuthenticateUserResultModel | null>(<any>null);
    }
    
}
