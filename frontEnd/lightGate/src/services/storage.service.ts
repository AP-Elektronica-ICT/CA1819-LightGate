import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class StorageService
{
    constructor(private _storage : Storage) { }

    //Save to Storage
    async saveToStorage(id: string) 
    {      
        this._storage.remove('sessionId');
        console.log("Saving to storage...");   
        return this._storage.set('sessionId', id);
    }

    //Load from Storage
    loadFromStorage(key: string)
    {
        if(this._storage.get(key) != null)
        {
            console.log("Loading from storage...");
            console.log(this._storage.get(key));

            return this._storage.get(key);
        }
    }
}