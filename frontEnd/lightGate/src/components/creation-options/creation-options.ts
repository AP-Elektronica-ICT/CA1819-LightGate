import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {NavController} from 'ionic-angular';
import { DeclareGuildNamesComponent } from "../declare-guild-names/declare-guild-names";
import { AuthenticationService, IPlayer } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
/**
 * Generated class for the CreationOptionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'creation-options',
  templateUrl: 'creation-options.html'
})
export class CreationOptionsComponent implements OnInit {
  configData = {};
  guildnames = {};
  Guilds: any;
  timeLimit: any;
  participate: boolean = false;
  text: string;
  name: string;

  currentPlayerName: string;
  currentPlayerId: string;
  result: string;
  storage_result: IPlayer;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, private _authSvc : AuthenticationService, private _storageSvc : StorageService) {
    console.log('Hello CreationOptionsComponent Component');
    this.text = 'Creation Option';
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

  values(){
    if(this.Guilds === undefined || this.timeLimit === undefined || this.name === undefined){
      alert("either Guilds, Time limit or name was not defined")
    } else {
      this.configData = {}
      this.guildnames = {};
      this.configData = {'guilds': this.Guilds, 'timeLimit': this.timeLimit, 'participate': this.participate}
      //this.varArray.push(this.Guilds, this.timeLimit, this.participate);
      console.log(this.configData);
      this.navCtrl.push(DeclareGuildNamesComponent, {
        guilds: this.Guilds,
        timeLimit: this.timeLimit,
        participate: this.participate,
        name: this.name
      })
      // for (let i = 0; i < this.Guilds; i++) {
      //   var count = i + 1;
      //   console.log(guildname)
      //   var guildname = 'Guildname '+count;
      //   this.presentPrompt(guildname)
      // }
    }
    
  }


  presentPrompt(guildname) {
    let alert = this.alertCtrl.create({
      title: 'Declare guildnames',
      inputs: [
        {
          name: guildname,
          placeholder: guildname
        }
      ],
      buttons: [
        {
          text: 'Next',
          role: 'Next',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }




}
