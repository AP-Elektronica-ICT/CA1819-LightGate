import { Component, OnInit } from '@angular/core';
import { ObjectivesService, IObjectivesRoot } from '../../services/objectives.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { directive } from '@angular/core/src/render3/instructions';

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

    //NOT HERE
    this.calculateDamage();
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

  deleteRequest(id: any, description: string)
  {
    this._svc.deleteObjectiveRequest(id, description);
  }

  calculateDamage()
  {
    //Get description from API
    
    //console.log("Calculating Damage");

    for (let index = 0; index < 10; index++) {
      
      if (this.objectives[index] != null)
      {
        let obj = this.objectives[index].labels;
        console.log(obj);
        
        if(obj[0].feature == "Horse" /*API.feature*/ && obj[1].feature == "White")
          {
            this.health.value -= 10;
            this.deleteRequest(this.objectives[index].id, this.objectives[index].description);
            //TODO
            //Exchange hardcoded string for the real feature
            //...
          }

          //Reload page for debugging
          location.reload(); 
      }
    }
  }

}
