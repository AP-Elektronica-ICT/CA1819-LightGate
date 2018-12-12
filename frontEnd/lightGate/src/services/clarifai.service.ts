import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class AuthenticationService
{
    // Uncomment for mobile debug
    //private url = "http://objective-creation-tool.azurewebsites.net/api/v1/players";
    
    // Uncomment for localhost debug
    // private url = "http://localhost:2052/api/v1/players";

    constructor(private _http: HttpClient) { }


    // postBase64(body: any)
    // {
    //     this._http.post(this.url, body).subscribe(result => {
    //         console.log("Post Result: " + result);
                
    //     });
    // }

    
}
  