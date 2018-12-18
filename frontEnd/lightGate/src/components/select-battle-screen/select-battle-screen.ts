import { Component, OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';
import { EnterPlayernameComponent } from "../enter-playername/enter-playername";
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

  join(index: number){
    console.log("INDEX: " + index);

    //Steven, dit is het battle ID dat meegegeven zal moeten worden naar het scherm waar jij aan bezig bent.
    //Dit kan ofterwijl met de NavParams worden meegegeven, of je kan een variabele in authentication.service.ts voorzien (bv. currentBattleId).
    //Hier kan je dan een methode voor maken: setCurrentBattleId. Deze roep je hier dan aan en dan geef je daar dit ID aan mee.
    //Als je dan nog een get request voorziet die naar de url: api/v1/battles/{id}/guilds gaat, dan kan je hier automatisch 
    //"this.currentBattleId" aan toevoegen in de service zelf. Als je nog vragen moest hebben over de backend kan je altijd de documentatie raadplegen 
    //(die ik straks nog ga updaten) of je kan het altijd aan mij vragen. Deze commentaar mag trouwens volledig weg als alles duidelijk is.
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

}
