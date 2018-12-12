import { Component, OnInit } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { JoinCreateComponent } from "../join-create/join-create";
import { AuthenticationService, IPlayer, IGuild, IBattleRoot } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';

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
  
  guildnames = {};
  guildNamesArray = [];
  guildname: any;
  count: any = 1;
 
  text: string;

  currentPlayerName: string;
  currentPlayerId: string;
  result: string;
  storage_result: IPlayer;

  firstGuild: Boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private _authSvc : AuthenticationService, private _storageSvc : StorageService) {
    console.log('Hello DeclareGuildNamesComponent Component');
    this.text = 'Create guild names';
    this.Guilds = navParams.get('guilds');
    this.timeLimit = navParams.get('timeLimit');
    this.participate = navParams.get('participate');
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
    //guildnames in array steken ipv json
    //this.guildnames['guild'+this.count] = this.guildname;
    this.guildNamesArray[this.count - 1] = this.guildname;

    this.count = this.count + 1;
    this.guildname = "";

    if(this.count > this.Guilds){
      console.log(this.guildnames);

      //Post guild
      this.postGuildRequest();

      this.navCtrl.push(JoinCreateComponent);
      alert('all ' + this.Guilds +' guilds have been created')
    }
  }

  async postGuildRequest()
  {    
      var battleId = await this.postBattleRequest();

      this.guildNamesArray.forEach(async guildName => {
        let body = {
          guildName: guildName,
          battleId: battleId
        }

        try{
          let result: IGuild = await this._authSvc.postGuildRequest(body);
              
              //Add the player, if participating, to the guild (using guild ID)
              if(this.participate && this.firstGuild)
              {
                var putResult: IPlayer = await this.putPlayerRequest(result.id);
                    console.log("Guild: " + result.guildName + " | Id: " + result.id + " | Participate: " + this.participate) + " | Player Id: " + putResult.id;
                    this.firstGuild = false;
              }

        }
        catch(e)
        {
          console.log(e);
        }
      });

      
    } 

  async postBattleRequest()
  {

    //A battle only has an ID attached to it. You do HAVE to send a body with a post request though.
    var body = {
    
    };

    var result: IBattleRoot = await this._authSvc.postBattleRequest(body);
        return result.id;
  }

  async putPlayerRequest(guildId: any)
  {
    console.log("GUILD-ID: " + guildId);

    var body = {
      id: this.currentPlayerId,
      guildId: guildId,
      isCreator: true
    }

    var result: IPlayer = await this._authSvc.putPlayerRequest(this.currentPlayerId, body);    
        return result;
    
  }

}
