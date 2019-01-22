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
import { GameOverComponent } from '../game-over/game-over'
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

  constructor(private httpClient:HttpClient,
              platform: Platform,
              private CameraPreview: CameraPreview,
              private StatusBar:StatusBar,
              private SplashScreen:SplashScreen,
              private screenOrientation: ScreenOrientation,
              private _svc : ObjectivesService,
              private _authSvc: AuthenticationService,
              private _storageSvc: StorageService,
              public navCtrl: NavController,
              public navParams: NavParams) {
    platform.ready().then(() => {
      //locks screen in landscape mode
      // TODO: Uncommend when deploying on mobile devide
      if(platform.is("ios") == true || platform.is("android") == true){
        try {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        } catch (error) {
          console.log("something went wrong during locking of screen");
          throw(error);
        }
      }


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
  currentObjective: IObjectivesRoot;
  currentPlayerId: string;
  battleId: string;
  currentBattle: IBattleRoot;
  currentPlayer: IPlayer;
  currentGuild: IGuild;
  guildId: string;
  index: number;
  players: IPlayer[] = [];
  tags: string[];

  timelimit: number;

  private hubConnection: HubConnection

  //get Random objectieve from database
  async ngOnInit()
  {

     this.hubConnection.on('UpdateCurrentBattle', () => {
        console.log("Fetching Current Battle...");
        this.getPlayers();
     });

     this.hubConnection.on('UpdateHealthBar', () => {
        console.log("Fetching Current Battle...");
        this.getPlayers();
        this.checkHealth();
     })

    this._svc.getObjectives().subscribe(result => {
      this.objectives = result;
      console.log(result);
      //console.log(result[0].description);
      this.randomObjCount = this.getRandomInt(this.objectives.length);
      this.currentObjective = this.objectives[this.randomObjCount];
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

  updateHealthBar()
  {
    if(this.hubConnection)
    {
      this.hubConnection.invoke("UpdateHealthBar");
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  async attack(){
    //this.PostToImgur("");
    this.takePicture();
  }

  checkIfHit(tags:string[], objectives:IObjectivesRoot){
    let check1:boolean;
    let check2:boolean;

    tags.forEach(label => {

      console.log(label);
      console.log(objectives.labels[0].feature);
      if (label == objectives.labels[0].feature) {
        check1=true;
      }
    });
    tags.forEach(label => {
      if (label == objectives.labels[1].feature) {
        check2=true;
      }
    });
    if (check1 && check2) {
      return true;
    }
    //TODO - SHOULD BE FALSE
    else return false;
  }

  useSkillOnTarget(){
    let targetGuild: IGuild;

    switch (this.currentPlayer.myJob) {
      case "knight":
        targetGuild = this.findGuild(this.currentGuild.attacking);
        targetGuild.health -= 10;
        console.log(targetGuild.health);
        this.createUpdateGuild(targetGuild);
        break;

      case "mage":
        targetGuild = this.findGuild(this.currentGuild.attackedBy);
        targetGuild.health -= 5;
        this.createUpdateGuild(targetGuild);

        targetGuild = this.findGuild(this.currentGuild.attacking);
        targetGuild.health -= 5;
        this.createUpdateGuild(targetGuild);
        break;

      case "cleric":
        targetGuild = this.currentGuild;

        if(targetGuild.health < 100)
        {
          targetGuild.health += 5;
        }
        else
        {
          targetGuild = this.findGuild(this.currentGuild.attacking);
          targetGuild.health -= 5;
        }

        if(targetGuild.health > 100)
        {
          targetGuild.health = 100;
        }

        this.createUpdateGuild(targetGuild);
        break;
    }
  }

  findGuild(id:string):IGuild{
    let foundGuild: IGuild;

    this.currentBattle.guilds.forEach(guild => {
      if (guild.id == id) {
        foundGuild = guild;
      }
    });
    return foundGuild;
  }


  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }


   takePicture() {
    this.CameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      console.log("This button will end up taking a ");
      //this.picture = 'data:image/jpeg;base64,' + imageData;
      this.picture = imageData.join();
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
      console.log("postImageRequest: " + result[0] + result[1] + result[2] + result[4]);
      this.tags = result;

      let isHit:boolean = this.checkIfHit(this.tags, this.currentObjective)
      if (isHit) {

        this.useSkillOnTarget();
        //Reload battle for all clients
        this.updateHealthBar();
      }

    } catch (e) {
      console.log(e);
    }

  }

  async createUpdateGuild(updateGuild: IGuild)
  {
    await this._authSvc.putGuildRequest(updateGuild.id, updateGuild);
  }

  // startCountdown(minutes : number)
  // {

  //   var counter = minutes;
  //   var interval = setInterval(() => {
  //     console.log(counter);
  //     counter--;

  //     if(counter < 0)
  //     {
  //       clearInterval(interval);
  //       console.log('Times Up!')
  //     }

  //   }, 60000);
  // }

  PostToImgur(base64)
  {
    const url = 'https://api.imgur.com/3/image';
    const body = {
      image: base64

    };
    const headers = new HttpHeaders({'Authorization':'Client-ID e89b61d9f20f749'});
    this.httpClient.post<IResult>(url, body, {headers: headers}).subscribe(
      (data : IResult) => {
          console.log(data);
          this.imgurUrl = data.data.link;
          console.log(this.imgurUrl);

          // TODO: Remove postImageRequest here
          //this.postImageRequest();
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

  checkHealth(){
      if (this.currentGuild.health <= 0 ){
      this.navCtrl.push(GameOverComponent);
    }
  }

  toOverview(){
    console.log("This naviates to Overview screen");
    this.navCtrl.push(OverviewScreenComponent, {
      battleId: this.battleId,
      hubConnection: this.hubConnection
    });
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
    this.timelimit = parseInt(this.currentBattle.battleTimeInMinutes);

    //this.startCountdown(this.timelimit);

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
