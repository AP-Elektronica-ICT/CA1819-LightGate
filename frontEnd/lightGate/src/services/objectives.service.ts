import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class ObjectivesService
{
    // Uncomment for mobile debug
    private base_url = "https://lightgate-api.azurewebsites.net/api/v1/";
    private objective_url = this.base_url + "objectives";

    // Uncomment for localhost debug


    constructor(private _http: HttpClient) { }

    getObjectives(): Observable<IObjectivesRoot[]>
    {
        return this._http.get<IObjectivesRoot[]>(this.objective_url);
    }

    postObjectiveRequest(body: any)
    {
        this._http.post(this.objective_url, body).subscribe(result => {
            console.log("Post Result: " + result);

        });
    }

    deleteObjectiveRequest(id: any, description: string)
    {
        this._http.delete(this.objective_url + id).subscribe();
        console.log("Completed Objective #" + id + " - " + description);
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
