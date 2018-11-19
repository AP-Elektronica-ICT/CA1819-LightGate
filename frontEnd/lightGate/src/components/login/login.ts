import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-login',
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit{

  constructor(private _svc : AuthenticationService) { }
  
  ngOnInit()
  {

  }

  postRequest()
  {
    var body = {
      name: (<HTMLInputElement>document.getElementById("player_name")).value
    }

    this._svc.postPlayerRequest(body);
  }

  

}
