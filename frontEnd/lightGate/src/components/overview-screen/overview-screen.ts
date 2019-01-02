import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BattleComponent } from "../battle/battle";
import { AuthenticationService, IGuild } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'overview-screen',
  templateUrl: 'overview-screen.html'
})
export class OverviewScreenComponent {

  text: string;

  constructor() {
    console.log('Hello OverviewScreenComponent Component');
    this.text = 'Hello World';
  }

}
