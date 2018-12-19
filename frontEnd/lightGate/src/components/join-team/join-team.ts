import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BattleComponent } from "../battle/battle";
import { AuthenticationService, IGuild } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the JoinTeamComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'join-team',
  templateUrl: 'join-team.html'
})
export class JoinTeamComponent implements OnInit {

  text: string;
  battleId: string;
  guilds: IGuild[];
  currentPlayerId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _authSvc: AuthenticationService, private _storageSvc: StorageService) {
    console.log('Hello JoinTeamComponent');
    this.text = 'Select a team you would like to join';
    this.battleId = navParams.get('battleId');
    console.log(this.battleId);
  }

  async ngOnInit()
  {
    try{
      this.currentPlayerId = await this._storageSvc.loadFromStorage('sessionId');
    }
    catch(e){
      console.log(e);
    }

    this.guilds = await this._authSvc.GetGuildsFromBattle(this.battleId);
  }

  join(index: number){
    console.log("index:" + index);
    console.log("clicked on Join");

    var pBody = {
      id: this.currentPlayerId,
      guildId: this.guilds[index].id}

    this._authSvc.putPlayerRequest(this.currentPlayerId, pBody);

    this.navCtrl.push(BattleComponent);
  }

}
