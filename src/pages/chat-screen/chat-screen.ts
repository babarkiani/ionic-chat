import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { map } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as haversine from 'haversine';

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
  @ViewChild('content') content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: ApiProvider, private helper: HelperProvider,
    private camera: Camera, private fireStorage: AngularFireStorage,
    private androidPermissions: AndroidPermissions) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
    ).catch(err => console.log(`cordova error`))
    // this.workerId = this.navParams.get('workerId');
    // this.workerName = this.navParams.get('name');
    // this.image = this.navParams.get('image');
    // this.userId = localStorage.getItem('uid');
    this.uploadImageId = Math.floor(Date.now() / 1000);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ChatScreenPage');
  // }

  getData(id) {
    this.ob1$ = this.api.getUserData(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        // const did = actions.payload.id;
        //return { did, ...data };
      }))
      .subscribe(res => {
        this.customer = res;

        this.userDistance = {
          latitude: this.customer.lat,
          longitude: this.customer.lng
        };


      });

    this.ob2$ = this.api.getWorkerProfile(this.workerId)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return { did, ...data };
      })).subscribe(res => {
        this.category = res;
        this.workerDistance = {
          latitude: this.category.lat,
          longitude: this.category.lng
        };
      });


  }

  checkPreviousMessages(id) {
    this.ob3$ = this.api.checkChatIfExistsWorker(this.workerId, id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return { did, ...data };
      })))
      .subscribe(res => {

        if (res.length !== 0) {
          this.chat = res[0];
          this.msgList = this.chat.messages;
          this.chatId = this.chat.did;
          delete this.chat['did'];
          setTimeout(() => {
            this.scrolltoBottom();
          }, 1000)
          if (this.chat.joboffer === true && this.showOnce === false) {
            this.getPost(this.chat.jobid);
            this.job = true;
            this.showOnce = true;
            let myfunc = () => {
              this.accept();
            };
            if (this.flag === 0) {
              this.flag++;
              this.helper.showAlertWithoutInput('Job Offer', `Accept Job Offer from ${this.chat.receiverName}`, 'Accept', myfunc);

            }

          }

        }
        else {
          this.newChat = true;
          this.chat = {
            senderId: this.uid,
            senderName: '',
            senderImage: '',
            receiverId: this.workerId,
            receiverName: this.workerName,
            receiverImage: this.image,
            messages: []

          };
          this.scrolltoBottom();
        }
      });

  }

  getPost(id) {
    this.ob4$ = this.api.getNewPostById(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const id = actions.payload.id;
        return { id, ...data };
      }))
      .subscribe(res => {
        this.post = res;
      });
  }

  sendMsg(e?) {
    if (e) {
      e.preventDefault();
    }

    if (this.newChat === false && this.newMsg !== '') {
      let x = new Date();
      let date = x.toDateString().toString();
      let time = x.getHours() + ":" + x.getMinutes();
      if (this.isImage === true)
        this.newMsg = this.sendImage;
      let data = { uid: this.userId, message: this.newMsg, time: `${date}, ${time}`, image: this.isImage };
      this.isImage = false;
      this.newMsg = '';
      this.chat.messages.push(data);
      this.api.updateChat(this.chatId, this.chat);
      this.scrolltoBottom();
    }
    else if (this.newChat === true && this.newMsg !== '') {
      let x = new Date();
      let date = x.toDateString().toString();
      let time = x.getHours() + ":" + x.getMinutes();
      if (this.isImage === true)
        this.newMsg = this.sendImage;
      let data = { uid: this.userId, message: this.newMsg, time: `${date}, ${time}`, image: this.isImage };
      this.isImage = false;
      this.newMsg = '';
      this.chat.senderName = this.customer.name;
      this.chat.senderImage = this.customer.imageURL;
      this.chat.messages.push(data);
      this.api.createChat(this.chat)
        .then(res => {
          this.newChat = false;
          this.checkPreviousMessages(this.uid);
          this.scrolltoBottom();
        });
    }
  }


  ionViewDidLoad() {
    this.scrolltoBottom();
  }

  scrolltoBottom() {
    try {
      this.content.scrollToBottom();
    }
    catch (e) {
      console.log(e)
    }

  }

  book() {
    this.navCtrl.push(BooknowPage, {
      workerId: this.workerId,
      workerName: this.workerName,
      category: this.category.categoryName,
      service: this.category.jobTitle
    })
  }

  choose() {
    let myfunc = () => {
      this.takePhoto('library');
    };
    let myfunc1 = () => {
      this.takePhoto('camera');
    };
    this.helper.presentActionSheet('Choose an option.', 'Gallery', 'Camera', myfunc, myfunc1);
  }

  takePhoto(source) {
    if (source === 'camera') {
      this.sourcex = this.camera.PictureSourceType.CAMERA;

    } else if (source === 'library') {
      this.sourcex = this.camera.PictureSourceType.PHOTOLIBRARY;

    }

    const options: CameraOptions = {
      sourceType: this.sourcex,
      quality: 30,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      // this.post.postImage = this.base64Image;
      this.upload();

    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  upload() {
    this.ref = this.fireStorage.ref(`posts/${this.uploadImageId}`);
    let task = this.ref.putString(this.base64Image, 'data_url');
    let uploadprogress = task.percentageChanges();
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.sendImage = url;
          if (this.sendImage != '') {
            this.isImage = true;
            this.sendMsg();
          }
        });
      })).subscribe();

  }

  ionViewDidLeave() {

    try {
      // this.ob1$.unsubscribe();
      // this.ob2$.unsubscribe();
      // this.ob3$.unsubscribe();
    }
    catch (err) {

    }
  }


  profile() {
    if (this.userDistance.latitude !== 0 &&
      this.userDistance.longitude !== 0 &&
      this.workerDistance.latitude !== 0 &&
      this.workerDistance.longitude !== 0
    )
      this.distance = Math.round(haversine(this.userDistance, this.workerDistance) * 10) / 10;
    if (isNaN(this.distance))
      this.distance = 0;
    // this.navCtrl.push(PlumberprofilePage, {
    //   id: this.workerId,
    //   distance: this.distance
    // });
  }

  accept() {
    let data = {
      city: this.post.city, customerId: this.post.customerId, date: this.post.date,
      postStatus: 'accepted', review: false, status: this.post.status, time: this.post.time, workerId: this.chat.receiverId, zipcode: this.post.zipcode, customerName: this.post.customerName,
      workerName: this.category.firstName, customerImage: this.post.customerImage, jobTitle: this.post.category, rate: this.category.rate, imageURL: this.category.imageURL
    };
    console.log(data)
    this.api.createPost(data)
      .then(res => {
        console.log(this.post.id)
        this.api.deletePost(this.post.id)
          .then(Response => {
            this.helper.presentToast('Job Accepted and Added to your List.');
            this.ob4$.unsubscribe();
            delete this.chat['joboffer'];
            delete this.chat['jobid'];
            console.log(this.chat)
            console.log(this.chatId)
            this.api.updateChat(this.chatId, this.chat)
              .then(ress => {
                this.job = false;
                let x = { image: this.post.customerImage ? this.post.customerImage : '', title: `${this.post.customerName} accepted your job request.`, time: new Date(), uid: this.chat.receiverId, type: 'request', id: res.id };
                console.log(x)
                this.api.createNotification(x)
                  .then(del => {
                    console.log(this.post.id)
                    this.api.deleteNotification(this.post.id)
                      .then(donothing => {

                      }, err => {
                        console.log(err)
                      })
                  })
              })
          }, err => {

          });
      }, err => {
        this.helper.presentToast('Error While Accepting the Job');
      });
  }

  acceptJob() {
    let myfunc = () => {
      this.accept();
    };
    this.helper.showAlertWithoutInput('Job Offer', `Accept Job Offer from ${this.chat.receiverName} for the Job :${this.post.desc}`, 'Accept', myfunc);
  }

  open(item) {
    if (item.image === true) {
      this.helper.presentImageModal(item.message);
    }
  }

  onFocus(event) {
    this.scrolltoBottom();
  }


}
