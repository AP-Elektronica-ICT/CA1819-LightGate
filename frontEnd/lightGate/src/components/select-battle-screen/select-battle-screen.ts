import { Component, OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthenticationService, IBattleRoot } from '../../services/authentication.service';
import { JoinTeamComponent } from '../join-team/join-team';

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
  
  text: string;
  battles: IBattleRoot[]

  constructor(public navCtrl: NavController, private _authSvc: AuthenticationService) {
    console.log('Hello SelectBattleScreenComponent Component');
    this.text = 'Select Battle';  
  }

  ngOnInit()
  {
    this.getBattlesWith(); 
  }

  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     this.getBattlesWith();
  //     refresher.complete();
  //   }, 2000);
  // }

  async getBattlesWith()
  {
    this.battles = await this._authSvc.getBattlesWith(); 
    console.log(this.battles);
    
  }

  join(index: number){
    console.log("INDEX: " + index);
    
    console.log(this.battles[index].id);
    this.navCtrl.push(JoinTeamComponent, {
      battleId: this.battles[index].id
    });


    //this.navCtrl.push(EnterPlayernameComponent);
  }

  onInput(input)
  {
    var inputValue: string = input.target.value;
    console.log(inputValue);
    this._authSvc.setCurrentName(inputValue);
    this.getBattlesWith();      
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

  refresh()
  {
    this.getBattlesWith();
  }

}
