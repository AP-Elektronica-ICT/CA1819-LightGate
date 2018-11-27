import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';

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
      var cameraWidth = window.screen.width;
      var camreaHeight = window.screen.height;


      const cameraPreviewOpts: CameraPreviewOptions = {
        //This will define the start coordinates of the camera view
        x: 0,
        y: 100,
        //defines the width and height of the view
        width: cameraWidth,
        height: camreaHeight - 290,
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

  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  picture : string;
  takePicture() {
    this.CameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      console.log("This button will end up taking a ");
      this.picture = 'data:image/jpeg;base64,' + imageData;
      console.log(this.picture)
    }, (err) => {
      console.log(err);
    });
  };

  Alert() {
    console.log("This button will end up taking a picture but has to function behind it just yet");
  }

}
