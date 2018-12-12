import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { EnterPlayernameComponent } from "../enter-playername/enter-playername";
/**
 * Generated class for the SelectBattleScreenComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-battle-screen',
  templateUrl: 'select-battle-screen.html'
})
export class SelectBattleScreenComponent {
  //testValue: any;
  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello SelectBattleScreenComponent Component');
    this.text = 'Select a battle you would like to join';
    //console.log(this.testValue);
  }

  join(){
    console.log("clicked on Join");
    this.navCtrl.push(EnterPlayernameComponent);
  }

}
