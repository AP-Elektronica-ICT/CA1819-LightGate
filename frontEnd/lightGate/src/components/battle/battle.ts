import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ObjectivesService, IObjectivesRoot } from '../../services/objectives.service';
import { resolveDefinition } from '@angular/core/src/view/util';
import { AuthenticationService, IImage } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';



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
export class BattleComponent implements OnInit {
  
  constructor(platform: Platform, private CameraPreview: CameraPreview, private StatusBar:StatusBar, private SplashScreen:SplashScreen, private screenOrientation: ScreenOrientation, private _svc : ObjectivesService, private _authSvc: AuthenticationService, private _storageSvc: StorageService) {
    platform.ready().then(() => {
      //locks screen in landscape mode
      
      // try {
      //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      // } catch (error) {
      //   console.log("something went wrong during locking of screen");
      //   throw(error);
      // }

      //define variables
      this.StatusBar.styleDefault();
      this.SplashScreen.hide();
      var cameraWidth = window.screen.width;
      var camreaHeight = window.screen.height;      

      

      const cameraPreviewOpts: CameraPreviewOptions = {
        //This will define the start coordinates of the camera view
        x: 50,
        y: 20,
        //defines the width and height of the view
        width: camreaHeight -20,
        height: cameraWidth - 80,
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
  
  objectives: IObjectivesRoot[];
  picture : string;
  randomObjCount : number;
  randomObjective: string;
  currentPlayerId: string;

  //get Random objectieve from database
  async ngOnInit()
  {
    this._svc.getObjectives().subscribe(result => {
      this.objectives = result;
      console.log(result);
      //console.log(result[0].description);
      this.randomObjCount = this.getRandomInt(this.objectives.length);
      console.log();
      this.randomObjective = this.objectives[this.randomObjCount].description;         
    });

    try{
      this.currentPlayerId = await this._storageSvc.loadFromStorage('sessionId');
    }
    catch(e)
    {
      console.log(e);
    }

    
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  

  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  
  
  takePicture() {
    this.CameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      console.log("This button will end up taking a ");
      this.picture = 'data:image/jpeg;base64,' + imageData;
      console.log(this.picture)

      this.postImageRequest();
      
    }, (err) => {
      console.log(err);
    });
  };

  // postRequest()
  // {
  //   var body = {
  //     name: (<HTMLInputElement>document.getElementById("player_name")).value
  //   }

  //   this._svc.postBase64(body);
  // }

  Alert() {
    console.log("This button will end up taking a picture but has to function behind it just yet");
  }

  async postImageRequest()
  {
    var body = {
      base64String: this.picture,
      playerId: this.currentPlayerId
    }

    try {
      var result = await this._authSvc.postImageRequest(body);  
      console.log("postImageRequest: " + result);
    } catch (e) {
      console.log(e);
    }
    
  }

}
