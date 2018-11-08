import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

import { HomePage } from '../pages/home/home';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, private CameraPreview: CameraPreview, private StatusBar:StatusBar, private SplashScreen:SplashScreen) {
    platform.ready().then(() => {

      this.StatusBar.styleDefault();
      this.SplashScreen.hide();


      const cameraPreviewOpts: CameraPreviewOptions = {
        //This will define the start coordinates of the camera view
        x: 50,
        y: 50,
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
}
