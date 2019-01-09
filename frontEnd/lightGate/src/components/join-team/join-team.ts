import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BattleComponent } from "../battle/battle";
import { AuthenticationService, IGuild, IBattleRoot } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'join-team',
  templateUrl: 'join-team.html'
})
export class JoinTeamComponent implements OnInit {

  text: string;
  battleId: string;
  guilds: IGuild[];
  currentBattle: IBattleRoot;
  currentPlayerId: string;
  jobLogo: string;
  isCreator: boolean = false;
  inSession: boolean = false;
  error: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _authSvc: AuthenticationService,
              private _storageSvc: StorageService) {
    console.log('Hello JoinTeamComponent');
    this.text = 'Select a team you would like to join';
    this.battleId = navParams.get('battleId');
    console.log(this.battleId);
  }

  async ngOnInit()
  {
    try{
      this.currentPlayerId = await this._storageSvc.loadFromStorage('sessionId');
      var currentPlayer = await this._authSvc.getCurrentPlayer(this.currentPlayerId);
      this.isCreator = currentPlayer.isCreator;
    }
    catch(e){
      console.log(e);
    }

    this.refresh();
  }

  getJobIcon(job: string){
    let iconName:string;
    switch(job){
      case "knight": {
        iconName = "color-filter";
        break;
      } 
      case "mage": {
        iconName = "color-wand";
        break;
      }
      case "cleric":{
        iconName = "sunny";
        break;
      }
      default: {
        iconName = "help";
        break;
      }
    }
    return iconName;
  }

  async join(index: number){
    
    if(this.guilds[index].players.length < 4)
    {
    console.log("index:" + index);

    var pBody = {
      id: this.currentPlayerId,
      guildId: this.guilds[index].id}

    await this._authSvc.putPlayerRequest(this.currentPlayerId, pBody);

    this.refresh();
    }
    else
    {
      this.error = "this group is full".toUpperCase();
    }
  }

  async startBattle()
  {
    if(this.isCreator)
    {
      var body = {
        id: this.battleId,
        inSession: true
      }
      //put request
      await this._authSvc.putBattleRequest(this.battleId, body);            
    }
    
    this.navCtrl.push(BattleComponent);
  }

  async refresh()
  {
    this.currentBattle = await this._authSvc.getCurrentBattle(this.battleId);
    this.guilds = this.currentBattle.guilds;

    console.log(this.currentBattle);

    if(this.currentBattle.inSession)
    {
      this.inSession = true;
    }
  }

}
