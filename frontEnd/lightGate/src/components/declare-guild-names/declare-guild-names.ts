import { Component, OnInit, ViewChild } from '@angular/core';
import {NavController, NavParams, DateTime } from 'ionic-angular';
//import { JoinCreateComponent } from "../join-create/join-create";
// import { HttpClient, Headers, RequestOptions } from '@angular/common/http';

import { AuthenticationService, IPlayer, IGuild, IBattleRoot } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { JoinTeamComponent } from '../join-team/join-team';
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

  async postGuildRequest()
  {
      var battleId = await this.postBattleRequest();

      for (let index = 0; index < this.guildNamesArray.length; index++) {

        let body = {
          guildName: this.guildNamesArray[index],
          battleId: battleId,
          //health: 100
        }

        try{
          let result: IGuild = await this._authSvc.postGuildRequest(body);

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
              
              //Push to JoinTeamComponent
              this.navCtrl.push(JoinTeamComponent, {
                battleId: battleId
              });
        }
        catch(e)
        {
          console.log(e);
        }
      };


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
