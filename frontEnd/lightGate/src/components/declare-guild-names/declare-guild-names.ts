import { Component, OnInit } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { JoinCreateComponent } from "../join-create/join-create";
import { AuthenticationService, IPlayer } from '../../services/authentication.service';
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
    this.guildnames['guild'+this.count] = this.guildname;

    //Post Request
    this.postGuildRequest();

    this.count = this.count + 1;
    this.guildname = "";

    if(this.count > this.Guilds){
      console.log(this.guildnames);
      this.navCtrl.push(JoinCreateComponent);
      alert('all ' + this.Guilds +' guilds have been created')
    }
  }

  async postGuildRequest()
  {
    var body = {
        guildName: this.guildname
    };

    console.log("BEFORE: " + this.guildname);
    var test = await this._authSvc.postGuildRequest(body);
    console.log(test.guildName + " | " + test.id);

    //TODO
    //PUT REQ to Player and add guild there
    //Add more to body
    //Add battle
    //First Guild = Join Creator if selected
  }

  async postBattleRequest()
  {
    var body = {

    };

    await this._authSvc.postBattleRequest(body);
  }

}
