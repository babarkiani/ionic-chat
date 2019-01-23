import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-screen',
  templateUrl: 'chat-screen.html',
})
export class ChatScreenPage {
  workerId;
  workerName;
  workerService;
  image;
  chat;
  userId;
  msgList;
  newMsg;
  chatId;
  newChat: boolean = false;
  customer;
  category;
  base64Image;
  sourcex;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadImageId;
  sendImage;
  uid;
  isImage: boolean = false;
  ob1$;
  ob2$;
  ob3$;
  ob4$;
  loader: boolean = false;
  userDistance;
  workerDistance;
  distance;
  job: boolean = false;
  post;
  showOnce: boolean = false;
  flag: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatScreenPage');
  }

}
