import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ChatPage } from '../pages/chat/chat';
import { ChatScreenPage } from '../pages/chat-screen/chat-screen';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebase = {
  apiKey: "AIzaSyAbZplqw7rUDD2Nha-hkNI8-EAHh0J771c",
  authDomain: "handyman-ea0e1.firebaseapp.com",
  databaseURL: "https://handyman-ea0e1.firebaseio.com",
  projectId: "handyman-ea0e1",
  storageBucket: "handyman-ea0e1.appspot.com",
  messagingSenderId: "221396946660"
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    SignUpPage,
    ChatPage,
    ChatScreenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    SignUpPage,
    ChatPage,
    ChatScreenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider
  ]
})
export class AppModule { }
