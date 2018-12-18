import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { BattleComponent } from "../battle/battle";

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
export class JoinTeamComponent {

  text: string;
  teams: string[] = ["Dunkey", "Unraveller", "Knack2Baby!"];
  members = [["Mario", "Knight"], ["Link", "Mage"], ["Kirby", "Cleric"], ["Samus", "Knight"]];

  constructor(public navCtrl: NavController) {
    console.log('Hello JoinTeamComponent');
    this.text = 'Select a team you would like to join';
  }

  join(){
    console.log("clicked on Join");
    this.navCtrl.push(BattleComponent);
  }

}
