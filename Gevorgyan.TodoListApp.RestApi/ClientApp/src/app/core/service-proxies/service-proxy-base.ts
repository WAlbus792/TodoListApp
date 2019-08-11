import {
    toDataSourceRequestString,
    translateDataSourceResultGroups,
    DataSourceRequestState
} from "@progress/kendo-data-query";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import "rxjs/add/operator/map";
import { UserSessionProvider } from "../user-session-provider";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InjectionToken, Inject } from "@angular/core";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export class ServiceProxyBase {
    constructor(
        private userSessionProvider: UserSessionProvider,
        @Inject(API_BASE_URL) private url: string,
        private httpEngine: HttpClient
    ) { }

    //protected hack = "?([^\"]*?)"; // hack for avoiding generation error

    /**
     * Method used in requests through the HttpClient class
     */
    protected transformOptions(options: any): Promise<any> {
        // if the session has already begun then add authorization token in the header of request
        if (this.userSessionProvider.isSessionStarted)
            options.headers = options.headers.append("Authorization", "Bearer " + this.userSessionProvider.token);

        return Promise.resolve(options);
    }

    /**
     * Returns the data for Kendo-grid
     * @param relativePath relative path to invoke the operation (e.g. "/api/AdministratorsManagement/")
     * @param state request state (filtration, sorting, etc.)
     */
    public fetch(relativePath: string, state: DataSourceRequestState, args?: [string, any][]): Observable<GridDataResult> {
        let queryStr: string = `${this.url}${relativePath}?${toDataSourceRequestString(state)}`;
        if (args != undefined) {
            for (let arg of args)
                queryStr += `&${arg[0]}=${arg[1]}`;
        }

        const hasGroups = state.group && state.group.length;

        let options = {
            body: "",
            method: "get",
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json; charset=UTF-8"
            })
        };

        return _observableFrom(this.transformOptions(options)).pipe(_observableMergeMap(transformedOptions => {
            return <Observable<any>>this.httpEngine.get<GridDataResult>(queryStr, transformedOptions);
        }))
            .map(response => response)
            .map(({ data, total /*, aggregateResults*/ }: GridDataResult) => // process the response
                (<GridDataResult>{
                    //if there are groups convert them to compatible format
                    data: hasGroups ? translateDataSourceResultGroups(data) : data,
                    total: total,
                    // convert the aggregates if such exists
                    //aggregateResult: translateAggregateResults(aggregateResults)
                })
            );
    }

    protected throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
        if (result !== null && result !== undefined)
            return _observableThrow(result);
        else
            return _observableThrow(new SwaggerException(message, status, response, headers, null));
    }

    protected blobToText(blob: any): Observable<string> {
        return new Observable<string>((observer: any) => {
            if (!blob) {
                observer.next("");
                observer.complete();
            } else {
                let reader = new FileReader();
                reader.onload = function () {
                    observer.next(this.result);
                    observer.complete();
                }
                reader.readAsText(blob);
            }
        });
    }
}

export interface FileContentResult {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}
