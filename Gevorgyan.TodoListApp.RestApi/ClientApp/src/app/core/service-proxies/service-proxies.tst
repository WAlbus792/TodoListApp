${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;
    using static System.Diagnostics.Debug;

    Template(Settings settings)
    {
        settings.IncludeProject("Gevorgyan.TodoListApp.RestApi");
        settings.OutputFilenameFactory = file => file.Name.Replace("Controller.cs", "ServiceProxy.ts");
        settings.OutputExtension = ".ts";
    }

     // generates Import components
    string Imports(Class c)
    {
        IEnumerable<string> resultTypes = 
               c.Methods.Where(m => m.Type.ClassName().EndsWith("Model"))
                        .Select(m => $"import {{ {m.Type.ClassName()} }} from '../models/{m.Type.ClassName()}'");

        IEnumerable<string> paramsTypes = 
               c.Methods.SelectMany(m => m.Parameters).Where(p => p.Type.ClassName().EndsWith("Model"))
                        .Select(m => $"import {{ {m.Type.ClassName()} }} from '../models/{m.Type.ClassName()}'");

        return string.Join(Environment.NewLine, resultTypes.Union(paramsTypes).Distinct());
    }

    // Class name for service proxy
    string ServiceProxyName(Class cl) => cl.Name.Replace("Controller", "ServiceProxy");

    // Is method for getting the data for kendo-grid?
    bool IsKendoRequest(Method method) => method.Parameters.Any(p => p.Attributes.Any(a => a.Name == "DataSourceRequest"));

    // Gets other parameters besides the main request parameter of kendo-grid
    IEnumerable<Parameter> NonKendoParameters(Method method) => method.Parameters.Where(p => p.Attributes.Any(a => a.Name == "FromQuery"));
    
    // Gets a parameter specified in route of the method for kendo-grid
    Parameter NonKendoParameterSpecifiedInRoute(Method method) => method.Parameters.FirstOrDefault(p => !p.Attributes.Any(a => a.Name == "FromQuery" || a.Name == "DataSourceRequest"));

    // Method parameter passed in the body of request 
    Parameter BodyParameter(Method method) => method.Parameters.FirstOrDefault(p => p.Attributes.Any(a => a.Name == "FromBody"));

    // Method for parameters passed through query string of request
    IEnumerable<Parameter> QueryStringParameters(Method method) => method.Parameters.Where(p => p.Attributes.Any(a => a.Name == "FromQuery"));

    // Method for checking has the method any query parameter
    bool AnyQueryParameter(Method method) => method.Parameters.Any(p => p.Attributes.Any(a => a.Name == "FromQuery"));

    // Method result is void?
    bool IsVoidResult(Method method) => method.Type.name == "void";

    // Method result is Enumerable?
    bool IsEnumerableResult(Method method) => method.Type.IsEnumerable;

    // Method result is file?
    bool IsFileResult(Method method) => method.Type.Name == "FileContentResult";

    // Method result Type is Primitive (string, boolean, etc)?
    bool IsResultTypePrimitive(Method method) => method.Type.IsPrimitive;

    // Returns Enumerable type name
    string EnumeratedType(Method method)
    {
        if(!method.Type.IsEnumerable)
            throw new InvalidOperationException("Attempt to get the type of items not of an Enumerable");
        string typeName = method.Type.Name;
        return typeName.Substring(0, typeName.Length - 2);
    }

    // All frequently used methods
    static List<string> httpMethods = new List<string>(){ "HttpGet", "HttpPost", "HttpDelete", "HttpPut"};

    // Http method name
    string HttpMethod(Method method)
    {
        string httpMethod = method.Attributes.FirstOrDefault(a => httpMethods.Contains(a.Name))?.Name;
        
        if(httpMethod != null)
            return httpMethod.Remove(0, 4).ToLower();
        
        throw new InvalidOperationException("Method of http request is not determined");
    }

    // Controller Name (without "Controller") for methods
    string ControllerName(Method method)
    {
        Class cl = (Class)method.Parent;
        return cl.Name.Replace("Controller", string.Empty);
    }

    // path to the Api method
    string Route(Method method)
    {
        var route = method.Attributes.FirstOrDefault(a => httpMethods.Contains(a.Name) && a.Value != null && a.Value != "{id}");
        return route?.Value ?? string.Empty;
    }

    bool IsParameterSpecifiedInRoute(Method method){
        return method.Attributes.Any(a => a.Value != null && a.Value.Contains("{") && a.Value.Contains("}"));
    }

    string RouteNameWithParameter(Method method) {
        var methodParameterName = method.Parameters.FirstOrDefault(p => !p.Attributes.Any()).name;
        var route = method.Attributes.FirstOrDefault(a => httpMethods.Contains(a.Name)).Value;

        string routeNameWithoutParam = route.Substring(route.IndexOf('}') + 1);
        
        var returnValue = methodParameterName;
        if(!string.IsNullOrWhiteSpace(routeNameWithoutParam))
            returnValue += $" + \"{routeNameWithoutParam}\"";

        return returnValue;
    }
}
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

$Classes(*Controller)[$Imports

export class $ServiceProxyName extends ServiceProxyBase {
    
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(
        private session: UserSessionProvider,
        @Inject(API_BASE_URL) private baseUrl: string,
        private http: HttpClient
    ) {
        super(session, baseUrl, http);
    }

    $Methods[
    $IsKendoRequest[
    $name($NonKendoParameterSpecifiedInRoute[$name: $Type, ]state: DataSourceRequestState$NonKendoParameters[, $name: $Type]): Observable<GridDataResult> {
        const relativePath = "/api/$ControllerName/"$IsParameterSpecifiedInRoute[ + $RouteNameWithParameter][ + "$Route"];
        let args: [string, any][] = [
        $NonKendoParameters[['$name', $name],]];
        return this.fetch(relativePath, state, args);
    }][

    $name($Parameters[$name: $Type][, ]): Observable<$IsVoidResult[void][$Type | null]> {
        let url_ = this.baseUrl + "/api/$ControllerName/$Route"$IsParameterSpecifiedInRoute[ + $RouteNameWithParameter]$AnyQueryParameter[ + "?"];
        $QueryStringParameters[
        if ($name === undefined || $name === null)
            throw new Error("The parameter '$name' must be defined and cannot be null.");
        else
            url_ += "$name=" + encodeURIComponent("" + $name) + "&";
        url_ = url_.replace(/[?&]$/, "");
        ]

        $BodyParameter[
        const content_ = JSON.stringify($name);
        ]

        let options_: any = {
            $BodyParameter[body: content_,]
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return Observable.fromPromise(this.transformOptions(options_)).flatMap(transformedOptions_ => {
            return this.http.request("$HttpMethod", url_, transformedOptions_);
        }).flatMap((response_: any) => {
            return this.process$Name(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.process$Name(<any>response_);
                } catch (e) {
                    return <Observable<$IsVoidResult[void][$Type | null]>><any>Observable.throw(e);
                }
            } else
                return <Observable<$IsVoidResult[void][$Type | null]>><any>Observable.throw(response_);
        });
    }

    protected process$Name(response: HttpResponseBase): Observable<$IsVoidResult[void][$Type | null]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            
            $IsVoidResult[
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return Observable.of<void>(<any>null);
            });
            ][
            $IsFileResult[
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename=this.hack?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Observable.of({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
            ][
            return this.blobToText(responseBlob).flatMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                $IsEnumerableResult[
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push($EnumeratedType.fromJS(item));
                }
            ][
            result200 = resultData200 ? $IsResultTypePrimitive[resultData200][$Type.fromJS(resultData200)] : <any>null;
            ]
            return Observable.of(result200);
            });
            ]]
        } 
        else if (status !== 200 && status !== 204) {
            return this.blobToText(responseBlob).flatMap(_responseText => {
                return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<$IsVoidResult[void][$Type | null]>(<any>null);
    }
    ]]
}
]