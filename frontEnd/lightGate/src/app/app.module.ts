import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CameraPreview} from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthenticationService } from '../services/authentication.service';
import { BattleComponent } from '../components/battle/battle';
import { LoginComponent } from '../components/login/login';
import { JoinCreateComponent } from '../components/join-create/join-create';
import { CreationOptionsComponent } from '../components/creation-options/creation-options';
import { DeclareGuildNamesComponent } from "../components/declare-guild-names/declare-guild-names";
import { SelectBattleScreenComponent } from "../components/select-battle-screen/select-battle-screen";
import { EnterPlayernameComponent } from "../components/enter-playername/enter-playername";
import { GameOverComponent } from "../components/game-over/game-over"
import { ObjectivesService } from '../services/objectives.service';
import { OverviewScreenComponent } from '../components/overview-screen/overview-screen';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from '../services/storage.service';
import { JoinTeamComponent } from '../components/join-team/join-team';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BattleComponent,
    LoginComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent,
    SelectBattleScreenComponent,
    EnterPlayernameComponent,
    DeclareGuildNamesComponent,
    OverviewScreenComponent,
    JoinTeamComponent,
    GameOverComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BattleComponent,
    LoginComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent,
    JoinCreateComponent,
    SelectBattleScreenComponent,
    EnterPlayernameComponent,
    JoinTeamComponent,
    OverviewScreenComponent,
    GameOverComponent
  ],
  providers: [
    ScreenOrientation,
    CameraPreview,
    StatusBar,
    SplashScreen,
    ObjectivesService,
    AuthenticationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService,
  ]
})
export class AppModule {}
