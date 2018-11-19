import { Component, OnInit } from '@angular/core';
import { ObjectivesService, IObjectivesRoot } from '../../services/objectives.service';

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

  constructor(private _svc : ObjectivesService) { }

  ngOnInit()
  {
    this._svc.getObjectives().subscribe(result => {
      this.objectives = result;
      console.log(result);
    });
  }

  postRequest()
  {
    var body = {
      description: (<HTMLInputElement>document.getElementById("objective_description")).value.toLowerCase(),
      labels: [
        {
          feature: (<HTMLInputElement>document.getElementById("objective_feature1")).value.toLowerCase()
        },
        {
          feature: (<HTMLInputElement>document.getElementById("objective_feature2")).value.toLowerCase()
        }
      ]
    }

    this._svc.postObjectiveRequest(body);
  }

  deleteRequest(id: any, description: string)
  {
    this._svc.deleteObjectiveRequest(id, description);
  }
}
