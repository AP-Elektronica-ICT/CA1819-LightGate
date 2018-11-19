import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello JoinCreateComponent Component');
    this.text = 'Hello World';
  }

}
