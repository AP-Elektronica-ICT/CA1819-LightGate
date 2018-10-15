import { Component } from '@angular/core';

/**
 * Generated class for the ObjectiveCreatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'objective-creator',
  templateUrl: 'objective-creator.html'
})
export class ObjectiveCreatorComponent {

  text: string;

  constructor() {
    console.log('Hello ObjectiveCreatorComponent Component');
    //this.text = 'Hello World';
  }

}
