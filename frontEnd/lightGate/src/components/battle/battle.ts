import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ObjectivesService, IObjectivesRoot } from '../../services/objectives.service';
import { resolveDefinition } from '@angular/core/src/view/util';
import {AuthenticationService, IImage, IPlayer, IBattleRoot, IGuild} from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { OverviewScreenComponent } from '../overview-screen/overview-screen';
import * as signalR from '@aspnet/signalr';



/**
 * Generated class for the BattleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-battle',
  templateUrl: 'battle.html'
})
export class BattleComponent implements OnInit {

  constructor(private httpClient:HttpClient, platform: Platform, private CameraPreview: CameraPreview, private StatusBar:StatusBar, private SplashScreen:SplashScreen, private screenOrientation: ScreenOrientation, private _svc : ObjectivesService, private _authSvc: AuthenticationService, private _storageSvc: StorageService, public navCtrl: NavController,
              public navParams: NavParams) {
    platform.ready().then(() => {
      //locks screen in landscape mode
      // TODO: Uncommend when deploying on mobile devide
      // try {
      //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      // } catch (error) {
      //   console.log("something went wrong during locking of screen");
      //   throw(error);
      // }

      //define variables
      this.battleId = navParams.get('battleId');
      this.hubConnection = navParams.get('hubConnection');
      this.StatusBar.styleDefault();
      this.SplashScreen.hide();
      var cameraWidth = window.screen.width;
      var camreaHeight = window.screen.height;



      const cameraPreviewOpts: CameraPreviewOptions = {
        //This will define the start coordinates of the camera view
        x: 50,
        y: 20,
        //defines the width and height of the view
        width: camreaHeight -20,
        height: cameraWidth - 80,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        //sets the view on the background
        toBack: true,
        alpha: 1
      };

      this.CameraPreview.startCamera(cameraPreviewOpts);
    });

  }

  objectives: IObjectivesRoot[];
  picture : string;
  imgurUrl : string;
  randomObjCount : number;
  randomObjective: string;
  currentObjective: string;
  currentPlayerId: string;
  battleId: string;
  currentBattle: IBattleRoot;
  currentPlayer: IPlayer;
  currentGuild: IGuild;
  guildId: string;
  index: number;
  players: IPlayer[] = [];

  private hubConnection: HubConnection

  //get Random objectieve from database
  async ngOnInit()
  {

     this.hubConnection.on('UpdateCurrentBattle', () => {
        console.log("Fetching Current Battle...");
        this.getPlayers();
     });

    this._svc.getObjectives().subscribe(result => {
      this.objectives = result;
      console.log(result);
      //console.log(result[0].description);
      this.randomObjCount = this.getRandomInt(this.objectives.length);
      console.log();
      this.randomObjective = this.objectives[this.randomObjCount].description;
      this.currentObjective = this.randomObjective
    });

    try{
      this.currentPlayerId = await this._storageSvc.loadFromStorage('sessionId');
      await this.getPlayers();
    }
    catch(e)
    {
      console.log(e);
    }


  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }


  takePicture() {
    this.CameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      console.log("This button will end up taking a ");
      this.picture = 'data:image/jpeg;base64,' + imageData;
      console.log(this.picture);
      this.PostToImgur(this.picture);
      this.postImageRequest();

    }, (err) => {
      console.log(err);
    });
  };

  async postImageRequest()
  {
    var body = {
      base64String: this.imgurUrl,
      playerId: this.currentPlayerId
    }

    try {
      var result = await this._authSvc.postImageRequest(body);
      console.log("postImageRequest: " + result);
    } catch (e) {
      console.log(e);
    }

  }

  PostToImgur(base64)
  {
    var base64Image = base64;
    const url = 'https://api.imgur.com/3/image';
    const body = {
      // TODO: change base64 content
      image: base64Image
    };
    const headers = new HttpHeaders({'Authorization':'Client-ID e89b61d9f20f749'});
    this.httpClient.post<IResult>(url, body, {headers: headers}).subscribe(
      (data : IResult) => {
          console.log(data);
          this.imgurUrl = data.data.link;
          console.log(this.imgurUrl);

          // TODO: Remove postImageRequest here
          this.postImageRequest();
      },
      (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
              console.log('Client-side error occured.');
          } else {
              console.log('Server-side error occured.');
              console.log(err);
          }
      }
    );

  }

  toOverview(){
    console.log("This naviates to Overview screen");
    this.navCtrl.push(OverviewScreenComponent);
  }

  jobImages : string[] = [];

  async getPlayers(){

    //API/v1/battles/-battleID-/guilds/-guildID-
    console.log('begin')
    this.currentBattle = await this._authSvc.getCurrentBattle(this.battleId);
    this.currentPlayer = await this._authSvc.getCurrentPlayer(this.currentPlayerId);
    this.guildId = this.currentPlayer.guildId;
    this.currentGuild = await this._authSvc.getSpecificGuildFromBattle(this.battleId, this.guildId);
    this.players = this.currentGuild.players;


    for (let index = 0; index < this.players.length; index++) {
      switch(this.players[index].myJob)
      {
        case "knight":
        this.jobImages.push("../../assets/imgs/character_jobs/knight.png");
        break;
        case "mage":
        this.jobImages.push("../../assets/imgs/character_jobs/mage.png");
        break;
        case "cleric":
        this.jobImages.push("../../assets/imgs/character_jobs/cleric.png");
        break;
      }

    }

    // TODO: request naar nieuwe route


    // this.guilds = await this.currentBattle.guilds;
    // console.log('after guilds')
    // this.players = await this.guilds[this.index].players;
    // console.log('---------PLAYERS----------' + this.players);

  }


}

export interface IInfo{
  link: string;
}
export interface IResult {
  data:IInfo;
}
