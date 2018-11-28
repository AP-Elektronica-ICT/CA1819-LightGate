import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class AuthenticationService
{
    // Uncomment for mobile debug
    //private url = "http://objective-creation-tool.azurewebsites.net/api/v1/players/";
    
    // Uncomment for localhost debug
    private url = "http://localhost:2052/api/v1/players/";
    public currentSessionId : string = null;

    constructor(private _http: HttpClient) { }

    //Create and Get Players

    getPlayers(): Observable<IPlayersRoot>
    {
        return this._http.get<IPlayersRoot>(this.url);
    }

   async postPlayerRequest(body: any)
    {
        return this._http.post<IPlayersRoot>(this.url, body).toPromise(); //toPromise / Async Await                        
    }

    deletePlayerRequest(id: any, name: string)
    {
        this._http.delete(this.url + id).subscribe();
        console.log("Completed Objective #" + id + " - " + name);       
    }

    //Session Code

    setSessionId(id: string)
    {
        this.currentSessionId = id;
    }

    getSessionId()
    {
        return this.currentSessionId;
    }

    async getCurrentPlayer(id: string)
    {   
        console.log("Getting current Player... [" + this.url + id + "]");
        return this._http.get<IPlayersRoot>(this.url + id).toPromise();
    }
}

export interface IPlayersRoot {
    id: string;
    name: string;
  }
  