import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class AuthenticationService
{
    // Uncomment for mobile debug
    private url = "http://objective-creation-tool.azurewebsites.net/api/v1/players/";
    
    // Uncomment for localhost debug
    //private url = "http://localhost:2052/api/v1/players/";

    public currentSessionId : string = null;

    constructor(private _http: HttpClient, private _storage: Storage) { }

    //Create and Get Players

    getPlayers(): Observable<IPlayersRoot>
    {
        return this._http.get<IPlayersRoot>(this.url);
    }

    postPlayerRequest(body: any)
    {
        this._http.post<IPlayersRoot>(this.url, body)   
        .subscribe(result => {
            console.log("Post Result: " + result.id);
            this.currentSessionId = result.id;
            console.log("Saving to storage...");
            this._storage.set('sessionId', this.currentSessionId);
                            
        });             
    }

    deletePlayerRequest(id: any, name: string)
    {
        this._http.delete(this.url + id).subscribe();
        console.log("Completed Objective #" + id + " - " + name);       
    }

    //Session Code

    getSessionId()
    {
        return this.currentSessionId;
    }

    getCurrentPlayer(id: string): Observable<IPlayersRoot>
    {   
        console.log("Getting current Player... [" + this.url + id + "]");
        return this._http.get<IPlayersRoot>(this.url + id);
    }
}

export interface IPlayersRoot {
    id: string;
    name: string;
  }
  