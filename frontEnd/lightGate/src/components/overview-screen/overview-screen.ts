import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BattleComponent } from "../battle/battle";
import { AuthenticationService, IGuild } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'overview-screen',
  templateUrl: 'overview-screen.html'
})
export class OverviewScreenComponent implements OnInit{

  battleId: string;
  guilds: IGuild[];
  currentPlayerId: number;

  constructor(public navParams: NavParams,
              private _storageSvc: StorageService,
              private _authSvc: AuthenticationService,
              public navCtrl: NavController) {
    console.log('Hello OverviewScreenComponent');
    this.battleId = navParams.get('battleId');
    console.log(this.battleId);
  }

  async ngOnInit()
  {
    try{
      this.currentPlayerId = await this._storageSvc.loadFromStorage('sessionId');    
      this.guilds = await this._authSvc.getGuildsFromBattle(this.battleId);
    }
    catch(e){
      console.log(e);
    }

  }

  toBattle(){
    console.log("This naviates to the battle screen");
    this.navCtrl.push(BattleComponent);
  }


}
