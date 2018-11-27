import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';

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
export class JoinCreateComponent {

  text: string;

  constructor(public nacCtrl: NavController) {
    console.log('Hello JoinCreateComponent Component');
    this.text = 'Join or Create';

    function navigateCreate(){
      console.log('create has been pressed');
    }
  }
  toCreate(){
    console.log("to Create screen");
    this.nacCtrl.push('CreationOptionsComponent');
  }

}
