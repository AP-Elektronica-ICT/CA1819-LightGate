import { Component, OnInit } from '@angular/core';
import { AuthenticationService, IPlayer } from '../../services/authentication.service';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { JoinCreateComponent } from '../join-create/join-create';
import { ToastController } from 'ionic-angular';

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
export class LoginComponent implements OnInit {

  result: IPlayer;
  player_name: string;
  player_job: string;
  toastMessage: string = "Chose a username and a job";

  constructor(
    private _authSvc: AuthenticationService,
    private _storageSvc: StorageService,
    private _navCtrl: NavController,
    private toastCtrl: ToastController) { }

  ngOnInit() {

  }


  showToast(messageToShow: string) {
    let toast = this.toastCtrl.create({
      message: messageToShow,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }



  async postPlayerRequest() {
    if (this.player_name != "" && this.player_name != null && this.player_job != null) {
      var body = {
        name: this.player_name,
        isCreator: false,
        myJob: this.player_job
      }

      try {
        this.result = await this._authSvc.postPlayerRequest(body);
        console.log("Post Result: " + this.result.id);
        this._authSvc.setSessionId(this.result.id);
        //Save to Storage
        await this._storageSvc.saveToStorage(this.result.id);
        //Go to the selection screen
        this._navCtrl.push(JoinCreateComponent);
      }
      catch (e) {
        console.log(e);
      }
    }

    else {
      this.showToast(this.toastMessage);
    }

  }



  postGuildRequest() { }
  postBattleRequest() { }



}
