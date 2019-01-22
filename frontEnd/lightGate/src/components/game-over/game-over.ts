import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LoginComponent } from '../login/login'



/**
 * Generated class for the GameOverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'game-over',
  templateUrl: 'game-over.html'
})
export class GameOverComponent {

  text: string;

  constructor(private screenOrientation: ScreenOrientation,
              public navCtrl: NavController,
              platform: Platform,) {

      platform.ready().then(() => {
      //locks screen in landscape mode
        console.log("is windows: " + platform.is("windows"));
        console.log("is ios: " + platform.is("ios"));
        console.log("is android: " + platform.is("android"));
        if(platform.is("ios") == true || platform.is("android") == true){
          try {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
          } catch (error) {
            console.log("something went wrong during locking of screen");
            throw(error);
          }
        }
    });
  }


  toJoin(){
    this.navCtrl.push(LoginComponent);
    console.log("function triggered")
  }


}
