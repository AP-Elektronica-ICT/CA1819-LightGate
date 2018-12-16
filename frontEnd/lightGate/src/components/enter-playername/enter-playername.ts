import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { JoinCreateComponent } from "../join-create/join-create";

/**
 * Generated class for the EnterPlayernameComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'enter-playername',
  templateUrl: 'enter-playername.html'
})
export class EnterPlayernameComponent {
  username: string
  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello EnterPlayernameComponent Component');
  }

  confirmName(){
    console.log(this.username);
    this.navCtrl.push(JoinCreateComponent);
  }
}
