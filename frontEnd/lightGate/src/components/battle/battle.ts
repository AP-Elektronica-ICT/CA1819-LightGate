import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

/**
 * Generated class for the BattleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-battle',
  templateUrl: 'battle.html'
})
export class BattleComponent {

  constructor(platform: Platform, private CameraPreview: CameraPreview, private StatusBar:StatusBar, private SplashScreen:SplashScreen) {
    platform.ready().then(() => {

      this.StatusBar.styleDefault();
      this.SplashScreen.hide();


      const cameraPreviewOpts: CameraPreviewOptions = {
        //This will define the start coordinates of the camera view
        x: 100,
        y: 200,
        //defines the width and height of the view
        width: 300,
        height: 300,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        //sets the view on the background
        toBack: true,
        alpha: 1
      };


      this.CameraPreview.startCamera(cameraPreviewOpts);
    });
    
  }

  Alert() {
    console.log("This button will end up taking a picture but has to function behind it just yet");
  }

}
