import { Component, OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthenticationService, IBattleRoot } from '../../services/authentication.service';
import { JoinTeamComponent } from '../join-team/join-team';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

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

  private hubConnection: HubConnection;

  constructor(public navCtrl: NavController, private _authSvc: AuthenticationService) {
    console.log('Hello SelectBattleScreenComponent Component');
    this.text = 'Select Battle';  
  }


  ngOnInit()
  { 
     this.getBattlesWith();

     this.hubConnection = new HubConnectionBuilder()
     .withUrl('https://lightgate-api.azurewebsites.net/battleHub')
     .configureLogging(signalR.LogLevel.Information)
     .build();

     this.hubConnection
     .start().then(() => {
      console.log("Connected");            
      })
     .catch(err => console.error(err.toString()))

     this.hubConnection.on('UpdateBattleList', () => {

      console.log("Reloading Battles");
      this.getBattlesWith();

     });   
  }

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
