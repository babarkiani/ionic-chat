import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient, private afs: AngularFirestore) {
    console.log('Hello ApiProvider Provider');
  }

  createUser(uid, data) {
    return this.afs.doc('customers/' + uid).set(data);
  }

  createUsers(uid, data) {
    return this.afs.doc('users/' + uid).set(data);
  }

  getUsersById(id) {
    return this.afs.doc('users/' + id).valueChanges();
  }

  getUsersLogindata() {
    return this.afs.collection('users').snapshotChanges();
  }

  getUserData(id) {
    return this.afs.doc('customers/' + id).snapshotChanges();
  }

  getUserById(id) {
    return this.afs.doc('customers/' + id).valueChanges();
  }

  updateUser(id, data) {
    return this.afs.doc('customers/' + id).update(data);
  }

  getUserCity(id) {
    return this.afs.doc('customers/' + id).snapshotChanges();
  }

  checkUser(email, password) {
    return this.afs.collection('customers', ref => ref.where('email', '==', email).where('password', '==', password)).valueChanges();
  }

  checkUserSiginMethod(email) {
    return this.afs.collection('customers', ref => ref.where('email', '==', email).where('siginMethod', '==', 'signup')).valueChanges();
  }

  updateUserLocation(id, data) {
    return this.afs.doc('customers/' + id).update(data);
  }



  // :::::::::::::::::::::::::::::::::::::: Categories ::::::::::::::::::::::::::::::::::::::::::::

  getCategories() {
    return this.afs.collection('category').snapshotChanges();
  }

  getSubCategorie(id) {
    return this.afs.collection('subCategory', ref => ref.where('categoryId', '==', id)).snapshotChanges();
  }

  getAllSubCategories() {
    return this.afs.collection('subCategory').snapshotChanges();
  }

  // ::::::::::::::::::::::::::::: get Workers ::::::::::::::::::::::::::::::::::::::::::

  getWorkers(id) {
    return this.afs.collection('workers', ref => ref.where('categoryId', '==', id)).snapshotChanges();
  }

  getWorkerById(id) {
    return this.afs.doc('workers/' + id).valueChanges();
  }

  getAllWorkers(id) {
    return this.afs.collection('workers', ref => ref.where('categoryId', '==', id)).snapshotChanges();
  }

  getWorkerProfile(id) {
    return this.afs.doc('workers/' + id).snapshotChanges();
  }

  updateWorker(id, data) {
    return this.afs.doc('workers/' + id).update(data);
  }

  updateWorkerLocation(id, data) {
    return this.afs.doc('workers/' + id).update(data);
  }

  checkWorker(email, password) {
    return this.afs.collection('workers', ref => ref.where('email', '==', email).where('password', '==', password)).valueChanges();
  }

  // ::::::::::::::::::::::::::::: Posts/Orders ::::::::::::::::::::::::::::::::::::::::

  createPost(data) {
    return this.afs.collection('posts').add(data);
  }

  getPosts(id) {
    return this.afs.collection('posts', ref => ref.where('customerId', '==', id).where('status', '==', 'active')).snapshotChanges();
  }

  getCompletedPosts(id) {
    return this.afs.collection('posts', ref => ref.where('customerId', '==', id).where('postStatus', '==', 'completed')).snapshotChanges();
  }

  getCompletedPosts2(id) {
    return this.afs.collection('posts', ref => ref.where('workerId', '==', id).where('postStatus', '==', 'completed')).snapshotChanges();
  }

  getBooking(id) {
    return this.afs.doc('posts/' + id).snapshotChanges();
  }

  updatePost(id, data) {
    return this.afs.doc('posts/' + id).update(data);
  }

  // ::::::::::::::::::::::::::::::::::::::::::::: Provider ::::::::::::::::::::::::::::::::::::::::::::::::::::::

  createUserWorker(id, data) {
    return this.afs.doc('workers/' + id).set(data);
  }

  getNewPosts(id) {
    return this.afs.collection('posts', ref => ref.where('workerId', '==', id).where('postStatus', '==', 'pending')).snapshotChanges();
  }

  getCurrentPosts(id) {
    return this.afs.collection('posts', ref => ref.where('workerId', '==', id).where('postStatus', '==', 'accepted')).snapshotChanges();
  }

  deleteOrderPost(id) {
    return this.afs.doc('posts/' + id).delete();
  }

  // ::::::::::::::::::::::::::::::::::::::::: Review ::::::::::::::::::::::::::::::::::::::::::::::::::

  createReview(data) {
    return this.afs.collection('review').add(data);
  }

  getReview(id) {
    return this.afs.collection('review', ref => ref.where('workerId', '==', id)).snapshotChanges();
  }

  // ::::::::::::::::::::::::::::::::::::::::::: CHAT :::::::::::::::::::::::::::::::::::::::::::::

  checkChatIfExistsWorker(id, uid) {
    return this.afs.collection('chat', ref => ref.where('receiverId', '==', id).where('senderId', '==', uid)).snapshotChanges();
  }

  updateChat(id, data) {
    return this.afs.doc('chat/' + id).set(data);
  }

  createChat(data) {
    return this.afs.collection('chat').add(data);
  }

  getSenderChats(id) {
    return this.afs.collection('chat', ref => ref.where('senderId', '==', id)).snapshotChanges();
  }

  getReceiverChats(id) {
    return this.afs.collection('chat', ref => ref.where('receiverId', '==', id)).snapshotChanges();
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::: New Posts ::::::::::::::::::::::::::::::::::::::::::::

  createNewPost(data) {
    return this.afs.collection('newposts').add(data);
  }

  getNewPostsRequests() {
    return this.afs.collection('newposts', ref => ref.where('status', '==', 'active')).snapshotChanges();
  }

  getNewPostById(id) {
    return this.afs.doc('newposts/' + id).snapshotChanges();
  }

  deletePost(id) {
    return this.afs.doc('newposts/' + id).delete();
  }

  // :::::::::::::::::::::::::::::::::::::::::::::: Account switch ::::::::::::::::::::::::::::::::::::::::::::::

  checkIfServiceSeekerExists(id) {
    return this.afs.doc('customers/' + id).valueChanges();
  }

  // Contact Us

  contactUs(data) {
    return this.afs.collection('contactus').add(data);
  }

  //  get Faqs

  getFaqs() {
    return this.afs.collection('faqs').valueChanges();
  }

  getPayment(id) {
    return this.afs.doc('settings/' + id).valueChanges();
  }

  getUserByPhoneNumber(phone, email) {
    return this.afs.collection('customers', ref => ref.where('phone', '==', phone).where('email', '==', email)).valueChanges();
  }

  getWorkerByPhoneNumber(phone, email) {
    return this.afs.collection('workers', ref => ref.where('phone', '==', phone).where('email', '==', email)).valueChanges();
  }

  checkUserExist(phone, email) {
    return this.afs.collection('users', ref => ref.where('phone', '==', phone).where('email', '==', email)).valueChanges();
  }

  getPhoneNumber(id) {
    return this.afs.doc('settings/' + id).valueChanges();
  }

  getPostedJob(id) {
    return this.afs.collection('newposts', ref => ref.where('customerId', '==', id)).snapshotChanges();
  }

  createNotification(data) {
    return this.afs.collection('notifications').add(data);
  }

  getNotifications(categoryId) {
    return this.afs.collection('notifications', ref => ref.where('categoryId', '==', categoryId)).valueChanges();
  }

  getNotificationsById(id) {
    return this.afs.collection('notifications', ref => ref.where('uid', '==', id)).valueChanges();
  }

  deleteNotification(id) {
    return this.afs.doc('notifications/' + id).delete();
  }

  checkIfBokkingExists(id) {
    return this.afs.doc('posts/' + id).valueChanges();
  }

  getAboutUs() {
    return this.afs.doc('settings/aboutus').valueChanges();
  }

  getPrivacy() {
    return this.afs.doc('settings/privacy').valueChanges();
  }


}

