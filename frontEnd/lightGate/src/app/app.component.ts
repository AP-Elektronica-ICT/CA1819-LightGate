import { Component } from '@angular/core';
import { HomePage } from '../pages/home/home';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  
}
