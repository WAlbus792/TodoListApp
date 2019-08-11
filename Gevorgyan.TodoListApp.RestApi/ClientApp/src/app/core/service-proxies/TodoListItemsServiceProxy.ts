
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

import { TodoListItemInputModel } from '../models/TodoListItemInputModel'

export class TodoListItemsServiceProxy extends ServiceProxyBase {
    
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(
        private session: UserSessionProvider,
        @Inject(API_BASE_URL) private baseUrl: string,
        private http: HttpClient
    ) {
        super(session, baseUrl, http);
    }

    
    

    create(model: TodoListItemInputModel): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoListItems/";
        

        
        const content_ = JSON.stringify(model);
        

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
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            
            
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return Observable.of<void>(<any>null);
            });
            
        } 
        else if (status !== 200 && status !== 204) {
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
    
    

    update(id: number, model: TodoListItemInputModel): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoListItems/" + id;
        

        
        const content_ = JSON.stringify(model);
        

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
            return this.http.request("put", url_, transformedOptions_);
        }).flatMap((response_: any) => {
            return this.processUpdate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processUpdate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            
            
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return Observable.of<void>(<any>null);
            });
            
        } 
        else if (status !== 200 && status !== 204) {
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
    
    

    remove(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoListItems/" + id;
        

        

        let options_: any = {
            
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return Observable.fromPromise(this.transformOptions(options_)).flatMap(transformedOptions_ => {
            return this.http.request("delete", url_, transformedOptions_);
        }).flatMap((response_: any) => {
            return this.processRemove(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRemove(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processRemove(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            
            
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return Observable.of<void>(<any>null);
            });
            
        } 
        else if (status !== 200 && status !== 204) {
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
    
}
