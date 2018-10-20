import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Component } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ObjectiveListComponent } from '../components/objective-list/objective-list';
import { ObjectivesService } from '../services/objectives.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { ComponentsModule } from '../components/components.module';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ObjectiveListComponent
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    //ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ObjectivesService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
