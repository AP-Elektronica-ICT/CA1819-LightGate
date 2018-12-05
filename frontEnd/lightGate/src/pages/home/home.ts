import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation) {
    function getCurrentScreenOrientation(){
      //gives current screen orrentation
      console.log(this.screenOrientation.type)
    }
    
    async function lockScreenOrientation(){
      try {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
        console.log("something went wrong during locking of screen");
        throw(error);
      }
    }

  }


}
