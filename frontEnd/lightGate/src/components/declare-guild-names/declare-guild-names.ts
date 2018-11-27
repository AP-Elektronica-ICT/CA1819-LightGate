import { Component } from '@angular/core';

/**
 * Generated class for the DeclareGuildNamesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'declare-guild-names',
  templateUrl: 'declare-guild-names.html'
})
export class DeclareGuildNamesComponent {

  text: string;

  constructor() {
    console.log('Hello DeclareGuildNamesComponent Component');
    this.text = 'Hello World';
  }

}
