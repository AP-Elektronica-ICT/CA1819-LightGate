import { Component, OnInit, ViewChild } from '@angular/core';
import {NavController, NavParams, DateTime } from 'ionic-angular';
//import { JoinCreateComponent } from "../join-create/join-create";
// import { HttpClient, Headers, RequestOptions } from '@angular/common/http';

import { AuthenticationService, IPlayer, IGuild, IBattleRoot } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { JoinTeamComponent } from '../join-team/join-team';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
/**
 * Generated class for the DeclareGuildNamesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'declare-guild-names',
  templateUrl: 'declare-guild-names.html'
})
export class DeclareGuildNamesComponent implements OnInit {

  Guilds: any;
  timeLimit: any;
  participate: boolean;
  name: string;

  guildnames = {};
  guildNamesArray = [];
  guildname: any;
  count: any = 1;

  text: string;

  currentPlayerName: string;
  currentPlayerId: string;
  result: string;
  storage_result: IPlayer;

  private guilds : IGuild[] = [];
  private health : number = 100;

  private hubConnection: HubConnection;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _authSvc : AuthenticationService, private _storageSvc : StorageService) {
    console.log('Hello DeclareGuildNamesComponent Component');
    this.text = 'Create guild names';
    this.Guilds = navParams.get('guilds');
    this.timeLimit = navParams.get('timeLimit');
    this.participate = navParams.get('participate');
    this.name = navParams.get('name');
    console.log(this.Guilds);
    console.log(this.timeLimit);
    console.log(this.participate);
  }

  async ngOnInit()
  {

    this.hubConnection = new HubConnectionBuilder()
    .withUrl('https://lightgate-api.azurewebsites.net/battleHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this.hubConnection
    .start().then(() => {
     console.log("Connected");            
     })
    .catch(err => console.error(err.toString()))


    try{
      this.result = await this._storageSvc.loadFromStorage('sessionId');
      this.currentPlayerId = this.result;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  addGuild(){
    if(this.guildname === undefined || this.guildname === ""){
      alert('value is undefined')

    } else  {
      //guildnames in array steken ipv json
      //this.guildnames['guild'+this.count] = this.guildname;
      this.guildNamesArray[this.count - 1] = this.guildname;

      this.count = this.count + 1;
      this.guildname = "";

      if(this.count > this.Guilds){
        console.log(this.guildnames);

        //Post guild
        this.postGuildRequest();

      }
    }

  }

  public updateBattleList(): void {

    if (this.hubConnection) {
        this.hubConnection.invoke('UpdateBattleList');
    }

}

  async postGuildRequest()
  {
      var battleId = await this.postBattleRequest();

      for (let index = 0; index < this.guildNamesArray.length; index++) {

        let body = {
          guildName: this.guildNamesArray[index],
          battleId: battleId,
          health: this.health
        }

        try{
          let result: IGuild = await this._authSvc.postGuildRequest(body);

          //push guild into the guild array to use for the attack algorithm
          this.guilds.push(result);

              //Add the player, if participating, to the guild (using guild ID)
              if(this.participate && index == 0)
              {
                var pBody = {
                  id: this.currentPlayerId,
                  guildId: result.id,
                  isCreator: true
                }

                var pResult: IPlayer = await this._authSvc.putPlayerRequest(this.currentPlayerId, pBody);
                //var putResult: IPlayer = await this.putPlayerRequest(result.id);
                    console.log("Guild: " + result.guildName + " | Id: " + result.id + " | Participate: " + this.participate + " | Player Id: " + pResult.id);
              }             
        }
        catch(e)
        {
          console.log(e);
        }
      };

      //Calculate attack pattern
      await this.calculateAttackPattern();

      //Reload data for others
      await this.updateBattleList();

      //Push to JoinTeamComponent
      this.navCtrl.push(JoinTeamComponent, {
          battleId: battleId,
          hubConnection: this.hubConnection
      });

    }

  async calculateAttackPattern ()
  {

    for (let index = 0; index < this.guilds.length; index++) {

      console.log("Calculating attack pattern for " + this.guilds[index].guildName);

      let body;

      //If it's the last guild in the list
      if(this.guilds[index] == this.guilds[this.guilds.length - 1])
      {
        body = {
          id: this.guilds[index].id,
          //attacks first guild in the list
          attacking: this.guilds[0].id,
          //attacked by second to last guild
          attackedBy: this.guilds[this.guilds.length - 2].id,
          health: this.health
        }
      }
      //If it's the first guild in the list
      else if (this.guilds[index] == this.guilds[0]) {
        body = {
          id: this.guilds[index].id,
          //attacks next guild
          attacking: this.guilds[index + 1].id,
          //attacked by last guild
          attackedBy: this.guilds[this.guilds.length - 1].id,
          health: this.health
        }
      }
      //If it's in between the first and last one
      else
      {
        body = {
          id: this.guilds[index].id,
          //attacks next guild
          attacking: this.guilds[index + 1].id,
          //attacked by previous guild
          attackedBy: this.guilds[index - 1].id,
          health: this.health
        }
      }

      await this._authSvc.putGuildRequest(this.guilds[index].id, body);      
      
    }
  }  

  async postBattleRequest()
  {

    //A battle only has an ID attached to it. You do HAVE to send a body with a post request though.
    var body = {
      name: this.name,
      battleTimeInMinutes: this.timeLimit,
      inSession: false
    };

    var result: IBattleRoot = await this._authSvc.postBattleRequest(body);
        return result.id;
  }
}
