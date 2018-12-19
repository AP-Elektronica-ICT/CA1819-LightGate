import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello SelectBattleScreenComponent Component');
    this.text = 'Hello World';
  }

}
