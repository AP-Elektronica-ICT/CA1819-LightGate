import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class AuthenticationService
{
    private currentPage = 0;
    private currentName = "";
    private base_url = "https://lightgate-api.azurewebsites.net/api/v1/";

    //Uncomment for mobile debug
    private player_url = this.base_url + "players/";
    private guild_url = this.base_url + "guilds/";
    private battle_url = this.base_url + "battles/";
    private battle_offset_url = this.base_url + "battles?page=";
    private image_url = this.base_url + "images/"

    // // Uncomment for localhost debug
    // private player_url = "http://localhost:2052/api/v1/players/";
    // private guild_url = "http://localhost:2052/api/v1/guilds/";
    // private battle_url = "http://localhost:2052/api/v1/battles/";
    // private battle_offset_url = "http://localhost:2052/api/v1/battles?page=";
    // private image_url = "http://localhost:2052/api/v1/images/";

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

    //Pagination

    setCurrentName(currentName: string)
    {
        //Search in all pages
        this.currentPage = null;

        //Set current name
        this.currentName = currentName;
    }

    next()
    {
        this.currentPage += 1;
    }

    previous()
    {
        if(this.currentPage != 0)
        {
            this.currentPage -= 1;
        }
        else
        {
            this.currentPage = 0;
        }
    }

    //Get Guilds and Battles

    async getBattles()
    {
        return this._http.get<IBattleRoot[]>(this.battle_url).toPromise();
    }

    async getBattlesWith()
    {
        console.log(this.battle_offset_url + this.currentPage);
        return this._http.get<IBattleRoot[]>(this.battle_offset_url + this.currentPage + "&name=" + this.currentName).toPromise();
    }

    async getCurrentBattle(id: string)
    {
        return this._http.get<IBattleRoot>(this.battle_url + id).toPromise();
    }

    //Post Images
    async postImageRequest(body: any)
    {
        return this._http.post<string[]>(this.image_url, body).toPromise();
    }


    async getGuildsFromBattle(id:string)
    {
        return this._http.get<IGuild[]>(this.battle_url + id + "/guilds/").toPromise();
    }

    //Put Battle
    async putBattleRequest(id: any, body: any)
    {
        return this._http.put<IBattleRoot>(this.battle_url + id, body).toPromise();
    }

    //get Specific guild from battle
    async getSpecificGuildFromBattle(battleId: any, guildId: any){
        return this._http.get<IGuild>(this.battle_url + battleId + "/guilds/" + guildId).toPromise();
    }

    //Put Guild
    async putGuildRequest(id: any, body: any)
    {
        return this._http.put<IGuild>(this.guild_url + id, body).toPromise();
    }


}

 export interface IBattleRoot {
    id: string;
    name: string;
    battleTimeInMinutes: string;
    guilds: IGuild[];
    inSession: boolean;
  }

  export interface IGuild {
    id: string;
    guildName: string;
    battleId: string;
    players: IPlayer[];
    health: number;
    attacking: string;
    attackedBy: string;
  }

  export interface IPlayer {
    id: string;
    name: string;
    guildId: string;
    isCreator: boolean;
    myJob: string;
  }

  export interface IImage {
      id: string
      base64String: string
      playerId: string
  }
