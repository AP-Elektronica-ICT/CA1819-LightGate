import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { CreationOptionsComponent } from "../creation-options/creation-options";
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

  constructor(public navCtrl: NavController) {
    console.log('Hello JoinCreateComponent Component');
    this.text = 'Join or Create';

    function navigateCreate(){
      console.log('create has been pressed');
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
