import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello EnterPlayernameComponent Component');
    this.text = 'Hello World';
  }

}
