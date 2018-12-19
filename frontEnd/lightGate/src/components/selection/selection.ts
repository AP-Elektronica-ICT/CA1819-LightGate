import { Component, OnInit } from '@angular/core';
import { AuthenticationService, IPlayersRoot } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';

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
  result: string;
  storage_result: IPlayersRoot;

  constructor(private _authSvc : AuthenticationService, private _storageSvc : StorageService) { }

  async ngOnInit()
    {
      try{
        this.result = await this._storageSvc.loadFromStorage('sessionId');
        this.storage_result = await this._authSvc.getCurrentPlayer(this.result);
          this.currentPlayerId = this.storage_result.id;
          this.currentPlayerName = this.storage_result.name;
      }
      catch(e)
      {
        console.log(e);
      }
    }

  }


