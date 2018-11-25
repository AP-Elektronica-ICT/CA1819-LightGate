import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SelectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-selection',
  templateUrl: 'selection.html'
})
export class SelectionComponent implements OnInit {

  currentPlayerName: string;
  currentPlayerId: string;

  constructor(private _svc : AuthenticationService, private _storage : Storage) { }

  ngOnInit()
  {
    if(this._storage.get('sessionId') != null)
    {
      console.log("Loading from storage...");
      this._storage.get('sessionId').then(result => {
        this._svc.getCurrentPlayer(result).subscribe(result => {
          this.currentPlayerId = result.id;
          this.currentPlayerName = result.name;
        });
      });
    }
  }
}
