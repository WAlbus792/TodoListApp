
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

import { TodoListViewModel } from '../models/TodoListViewModel'
import { TodoListInputModel } from '../models/TodoListInputModel'

export class TodoListsServiceProxy extends ServiceProxyBase {
    
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(
        private session: UserSessionProvider,
        @Inject(API_BASE_URL) private baseUrl: string,
        private http: HttpClient
    ) {
        super(session, baseUrl, http);
    }

    
    
    getTodoLists(state: DataSourceRequestState): Observable<GridDataResult> {
        const relativePath = "/api/TodoLists/" + "";
        let args: [string, any][] = [
        ];
        return this.fetch(relativePath, state, args);
    }
    

    getTodoList(id: number): Observable<TodoListViewModel | null> {
        let url_ = this.baseUrl + "/api/TodoLists/" + id;
        

        

        let options_: any = {
            
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return Observable.fromPromise(this.transformOptions(options_)).flatMap(transformedOptions_ => {
            return this.http.request("get", url_, transformedOptions_);
        }).flatMap((response_: any) => {
            return this.processGetTodoList(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetTodoList(<any>response_);
                } catch (e) {
                    return <Observable<TodoListViewModel | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<TodoListViewModel | null>><any>Observable.throw(response_);
        });
    }

    protected processGetTodoList(response: HttpResponseBase): Observable<TodoListViewModel | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            
            
            
            return this.blobToText(responseBlob).flatMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                
            result200 = resultData200 ? TodoListViewModel.fromJS(resultData200) : <any>null;
            
            return Observable.of(result200);
            });
            
        } 
        else if (status !== 200 && status !== 204) {
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<TodoListViewModel | null>(<any>null);
    }
    
    

    create(model: TodoListInputModel): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoLists/";
        

        
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
    
    

    update(id: number, model: TodoListInputModel): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoLists/" + id;
        

        
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
        let url_ = this.baseUrl + "/api/TodoLists/" + id;
        

        

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
    
    
    getTodoListItems(todoListId: number, state: DataSourceRequestState): Observable<GridDataResult> {
        const relativePath = "/api/TodoLists/" + todoListId + "/items";
        let args: [string, any][] = [
        ];
        return this.fetch(relativePath, state, args);
    }
}
