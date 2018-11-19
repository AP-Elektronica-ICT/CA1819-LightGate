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
    private url = "http://localhost:2052/api/v1/players";

    constructor(private _http: HttpClient) { }

    getPlayers(): Observable<IPlayersRoot>
    {
        return this._http.get<IPlayersRoot>(this.url);
    }

    postPlayerRequest(body: any)
    {
        this._http.post(this.url, body).subscribe(result => {
            console.log("Post Result: " + result);
                
        });
    }

    deletePlayerRequest(id: any, name: string)
    {
        this._http.delete(this.url + id).subscribe();
        console.log("Completed Objective #" + id + " - " + name);       
    }
}

export interface IPlayersRoot {
    id: string;
    name: string;
  }
  