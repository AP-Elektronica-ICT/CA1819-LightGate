import { Component, OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';
import { EnterPlayernameComponent } from "../enter-playername/enter-playername";
import { AuthenticationService, IBattleRoot } from '../../services/authentication.service';

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
export class SelectBattleScreenComponent implements OnInit {
  //testValue: any;
  text: string;
  battles: IBattleRoot[]

  constructor(public navCtrl: NavController, private _authSvc: AuthenticationService) {
    console.log('Hello SelectBattleScreenComponent Component');
    this.text = 'Select Battle';
    //console.log(this.testValue);
  }

  ngOnInit()
  {
    this.getBattlesWith(); 
  }

  async getBattlesWith()
  {
    this.battles = await this._authSvc.getBattlesWith(); 
    console.log(this.battles);
  }

  join(){
    //console.log("clicked on Join");
    this.navCtrl.push(EnterPlayernameComponent);
  }

  onInput(input)
  {
    var inputValue: string = input.target.value;
    console.log(inputValue);
    this._authSvc.setCurrentName(inputValue);
    this.getBattlesWith();      
  }

  onCancel(canceledInput)
  {
    console.log(canceledInput);
  }

  previous()
  {
    this._authSvc.previous();
    this.getBattlesWith();  
  }

  next()
  {
    this._authSvc.next();
    this.getBattlesWith();  
  }

  

}
