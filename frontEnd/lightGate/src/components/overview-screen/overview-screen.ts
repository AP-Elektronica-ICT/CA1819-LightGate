import { Component } from '@angular/core';

/**
 * Generated class for the OverviewScreenComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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
