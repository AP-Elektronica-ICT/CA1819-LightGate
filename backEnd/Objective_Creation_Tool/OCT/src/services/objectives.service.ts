import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class ObjectivesService
{
    constructor(private _http: HttpClient) { }

    getObjectives(): Observable<IObjectivesRoot>
    {
        return this._http.get<IObjectivesRoot>("http://localhost:5000/api/v1/objectives");
    }

    postObjectiveRequest(body: any)
    {
        this._http.post("http://localhost:5000/api/v1/objectives", body).subscribe(result => {
            console.log("Post Result 1: " + result);
                
        });
    }
}

export interface IObjectivesRoot {
    id: number;
    description: string;
    labels: ILabel[];
  }
  
export interface ILabel {
    id: number;
    feature: string;
    objectiveId: number;
  }