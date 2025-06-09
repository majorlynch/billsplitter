// import { initializeApp } from "firebase/app";
//import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
//import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
    private dbPath = '/API_KEY_DEEPSEEK';
  docs: AngularFireList<any>;
  data: any;
  analytics: any;
  firestore: any;

  constructor(private db: AngularFireDatabase) {
    this.docs = db.list(this.dbPath);
  }

 getAll():any {
    return this.docs.snapshotChanges().subscribe(data => this.data = data);
  }

}
