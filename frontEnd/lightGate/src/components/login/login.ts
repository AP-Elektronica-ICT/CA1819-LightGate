import { Component, OnInit } from '@angular/core';
import { AuthenticationService, IPlayer } from '../../services/authentication.service';
import { NavController } from 'ionic-angular';
import { SelectionComponent } from '../selection/selection';
import { StorageService } from '../../services/storage.service';
import { JoinCreateComponent } from '../join-create/join-create';

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

  result : IPlayer
  player_name: string
  player_job: string

  constructor(private _authSvc : AuthenticationService, private _storageSvc : StorageService, private _navCtrl: NavController) { }
  
  ngOnInit()
  {
    
  }

 async postPlayerRequest()
  {
    var body = {
      name: this.player_name,
      isCreator: false,
      myJob: this.player_job
    }
    

    try{
      this.result = await this._authSvc.postPlayerRequest(body);
        console.log("Post Result: " + this.result.id);
        this._authSvc.setSessionId(this.result.id);
          //Save to Storage
          await this._storageSvc.saveToStorage(this.result.id);
          //Go to the selection screen
            this._navCtrl.push(JoinCreateComponent);
    }
    catch(e)
    {
      console.log(e);
    }     
                               
  }

  postGuildRequest()
  {

  }

  postBattleRequest()
  {

  }

  

}
