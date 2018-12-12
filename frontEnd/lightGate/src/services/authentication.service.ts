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
    private player_url = "http://localhost:2052/api/v1/players/";
    private guild_url = "http://localhost:2052/api/v1/guilds/";
    private battle_url = "http://localhost:2052/api/v1/battles/";

    public currentSessionId : string = null;

    constructor(private _http: HttpClient) { }

    //Create, Get, Update and Delete Players

    getPlayers(): Observable<IPlayer>
    {
        return this._http.get<IPlayer>(this.player_url);
    }

   async postPlayerRequest(body: any)
    {
        return this._http.post<IPlayer>(this.player_url, body).toPromise(); //toPromise / Async Await                        
    }

    deletePlayerRequest(id: any, name: string)
    {
        this._http.delete(this.player_url + id).subscribe();
        console.log("Completed Objective #" + id + " - " + name);       
    }

    async putPlayerRequest(id: any, body: any)
    {
        return this._http.put<IPlayer>(this.player_url + id, body).toPromise();
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
        console.log("Getting current Player... [" + this.player_url + id + "]");
        return this._http.get<IPlayer>(this.player_url + id).toPromise();
    }

    //Create Guilds and Battles

    async postGuildRequest(body: any)
    {
        return this._http.post<IGuild>(this.guild_url, body).toPromise(); 
    }

    async postBattleRequest(body: any)
    {
        return this._http.post<IBattleRoot>(this.battle_url, body).toPromise();
    }
}

 export interface IBattleRoot {
    id: string;
    guilds: IGuild[];
  }
  
  export interface IGuild {
    id: string;
    guildName: string;
    battleId: string;
    players: IPlayer[];
  }
  
  export interface IPlayer {
    id: string;
    name: string;
    guildId: string;
    isCreator: boolean;
  }
  