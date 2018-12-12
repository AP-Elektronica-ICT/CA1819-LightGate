import { Component, OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';
import { CreationOptionsComponent } from "../creation-options/creation-options";
import { AuthenticationService, IPlayer } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
/**
 * Generated class for the JoinCreateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'join-create',
  templateUrl: 'join-create.html'
})
export class JoinCreateComponent implements OnInit {

  text: string;

  currentPlayerName: string;
  currentPlayerId: string;
  result: string;
  storage_result: IPlayer;

  constructor(public navCtrl: NavController, private _authSvc : AuthenticationService, private _storageSvc : StorageService) {
    console.log('Hello JoinCreateComponent Component');
    this.text = 'Join or Create';

    function navigateCreate(){
      console.log('create has been pressed');
    }
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

  toJoin(){
    console.log("This naviates to Join session");
    //this.nacCtrl.push('CreationOptionsComponent');
  }

  toCreate(){
    console.log("This navigates to Create session");
    //this.nacCtrl.push('CreationOptionsComponent');
    this.navCtrl.push(CreationOptionsComponent);
  }

  
}
