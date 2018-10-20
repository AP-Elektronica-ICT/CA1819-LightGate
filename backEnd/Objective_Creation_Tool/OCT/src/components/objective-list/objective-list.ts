import { Component, OnInit } from '@angular/core';
import { ObjectivesService, IObjectivesRoot } from '../../services/objectives.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ObjectiveListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'objective-list',
  templateUrl: 'objective-list.html'
})
export class ObjectiveListComponent implements OnInit {

  text: string;
  objectives: IObjectivesRoot
  currentImage: any;
  health: any;

  constructor(private _svc : ObjectivesService, private camera: Camera) { }

  ngOnInit()
  {
    this._svc.getObjectives().subscribe(result => {
      this.objectives = result;
      console.log(result);
    });

    this.health = document.getElementById("health");
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      this.calculateDamage();
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
  } 

  postRequest()
  {
    var body = {
      description: (<HTMLInputElement>document.getElementById("objective_description")).value,
      labels: [
        {
          feature: (<HTMLInputElement>document.getElementById("objective_feature1")).value
        },
        {
          feature: (<HTMLInputElement>document.getElementById("objective_feature2")).value
        }
      ]
    }

    this._svc.postObjectiveRequest(body);
  }

  calculateDamage()
  {
    //Get percentages from camera API
    console.log("Calculating Damage");
    this.objectives.labels.forEach(label => {
      if(label.feature[0] == "Car"/*feature*/ && label.feature[1] == "Red"/*feature*/)
      {
        this.health.value -= 10;
        //TODO
        //Exchange hardcoded string for the real feature
        //if camera API percentage is > 0.7
        //...
      }
    });
  }

}
