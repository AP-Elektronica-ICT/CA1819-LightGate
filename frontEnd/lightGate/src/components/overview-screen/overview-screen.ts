import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BattleComponent } from "../battle/battle";
import { AuthenticationService, IGuild } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { HubConnection } from '@aspnet/signalr';
import { CameraPreview} from '@ionic-native/camera-preview';
import { Platform } from 'ionic-angular';



@Component({
  selector: 'overview-screen',
  templateUrl: 'overview-screen.html'
})
export class OverviewScreenComponent implements OnInit{

  battleId: string;
  guilds: IGuild[];
  currentPlayerId: number;

  private hubConnection: HubConnection

  constructor(public navParams: NavParams,
              private _storageSvc: StorageService,
              private _authSvc: AuthenticationService,
              private CameraPreview: CameraPreview,
              platform: Platform,
              public navCtrl: NavController) {
    console.log('Hello OverviewScreenComponent');
    this.battleId = navParams.get('battleId');
    this.hubConnection = navParams.get('hubConnection');
    console.log(this.battleId);

    // platform.ready().then(() => {
    //   CameraPreview.stopCamera();
    // });
  }

  async ngOnInit()
  {

    this.hubConnection.on('UpdateHealthBar', () => {
      console.log("Fetching Current Battle...");
      this.getGuildsFromBattle();
   })

    try{
      this.getGuildsFromBattle();
    }
    catch(e){
      console.log("Error on loading OverviewScreen");
      console.log(e);
    }

  }

  async getGuildsFromBattle()
  {
    this.currentPlayerId = await this._storageSvc.loadFromStorage('sessionId');
    this.guilds = await this._authSvc.getGuildsFromBattle(this.battleId);
    console.log("health: " + this.guilds[0].health);
  }


  toBattle(){
    console.log("This naviates to the battle screen");
    this.navCtrl.push(BattleComponent, {
      battleId: this.battleId,
      hubConnection: this.hubConnection
    });
  }


}
