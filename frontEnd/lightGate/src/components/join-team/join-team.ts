import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BattleComponent } from "../battle/battle";
import { AuthenticationService, IGuild, IBattleRoot, IPlayer } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OverviewScreenComponent } from '../overview-screen/overview-screen';
import { SelectBattleScreenComponent } from '../select-battle-screen/select-battle-screen';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

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
  currentPlayer: IPlayer;

  private hubConnection: HubConnection;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _authSvc: AuthenticationService,
              private _storageSvc: StorageService) {
    console.log('Hello JoinTeamComponent');
    this.text = 'Select a team you would like to join';
    this.battleId = navParams.get('battleId');
    this.hubConnection = navParams.get('hubConnection');
    console.log(this.battleId);
  }

  async ngOnInit()
  {

     this.hubConnection.on('UpdateBattleState', () => {

      console.log("Fetching Battle State...");
      this.refresh();

     });
     
     this.hubConnection.on('UpdateGuildList', () => {
        console.log("Fetching Guild Lists...");
        this.refresh();
     });

    try{
      this.currentPlayerId = await this._storageSvc.loadFromStorage('sessionId');
      this.currentPlayer = await this._authSvc.getCurrentPlayer(this.currentPlayerId);
      this.isCreator = this.currentPlayer.isCreator;
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

    this.updateGuildList();
    }
    else
    {
      this.error = "this group is full".toUpperCase();
    }
  }

  public updateBattleState() {

    if (this.hubConnection) {
        this.hubConnection.invoke('UpdateBattleState');
    }
  }

  public updateCurrentBattle()
  {
    if(this.hubConnection){
      this.hubConnection.invoke('UpdateCurrentBattle');
    }
  }

  public updateGuildList() {
    if(this.hubConnection) {
      this.hubConnection.invoke('UpdateGuildList');
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
      this.updateBattleState();


    }

    this.updateCurrentBattle();

    this.navCtrl.push(BattleComponent, {
      battleId: this.battleId,
      hubConnection: this.hubConnection
    });
  }

  async refresh()
  {
    this.currentBattle = await this._authSvc.getCurrentBattle(this.battleId);
    this.currentPlayer = await this._authSvc.getCurrentPlayer(this.currentPlayerId);
    this.guilds = this.currentBattle.guilds;

    console.log(this.currentBattle);

    if(this.currentBattle.inSession && this.currentPlayer.guildId != null)
    {
      this.inSession = true;      
    }
  }

  toSelectBattle()
  {
    this.navCtrl.push(SelectBattleScreenComponent);
  }

}
