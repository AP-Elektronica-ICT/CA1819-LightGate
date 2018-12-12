import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
//import { JoinCreateComponent } from "../join-create/join-create";
import { BattleComponent } from '../battle/battle';
// import { HttpClient, Headers, RequestOptions } from '@angular/common/http';



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
export class DeclareGuildNamesComponent {
  Guilds: any;
  timeLimit: any;
  participate: boolean;
  
  guildnames = {};
  guildname: any;
  count: any = 1;
 
  text: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello DeclareGuildNamesComponent Component');
    this.text = 'Create guild names';
    this.Guilds = navParams.get('guilds');
    this.timeLimit = navParams.get('timeLimit');
    this.participate = navParams.get('participate');
    console.log(this.Guilds);
    console.log(this.timeLimit);
    console.log(this.participate);
  }

  sendPostRequest() {
    
  }


  addGuild(){
    if(this.guildname === undefined || this.guildname === ""){
      alert('value is undefined')
      
    }
    else {
      this.guildnames['guild'+this.count] = this.guildname;
      this.count = this.count + 1;
      this.guildname = "";
      if(this.count > this.Guilds){
        console.log(this.guildnames);
        this.navCtrl.push(BattleComponent);
        alert('all ' + this.Guilds +' guilds have been created')

        // TODO Add call to backend here
       }
    }
    
  }

}
