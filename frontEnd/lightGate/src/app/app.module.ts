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
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BattleComponent,
    LoginComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreationOptionsComponent,
    DeclareGuildNamesComponent,
    JoinCreateComponent
  ],
  providers: [
    ScreenOrientation,
    CameraPreview,
    StatusBar,
    SplashScreen,
    AuthenticationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
