import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {NavController} from 'ionic-angular';
import { DeclareGuildNamesComponent } from "../declare-guild-names/declare-guild-names";
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
export class CreationOptionsComponent {
  configData = {};
  guildnames = {};
  Guilds: any;
  timeLimit: any;
  participate: boolean = false;
  text: string;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController) {
    console.log('Hello CreationOptionsComponent Component');
    this.text = 'Creation Option';
  }

  values(){
    if(this.Guilds === undefined || this.timeLimit === undefined){
      alert("either Guilds or Time limit was not defined")
    } else {
      this.configData = {}
      this.guildnames = {};
      this.configData = {'guilds': this.Guilds, 'timeLimit': this.timeLimit, 'participate': this.participate}
      //this.varArray.push(this.Guilds, this.timeLimit, this.participate);
      console.log(this.configData);
      this.navCtrl.push(DeclareGuildNamesComponent, {
        guilds: this.Guilds,
        timeLimit: this.timeLimit,
        participate: this.participate
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
