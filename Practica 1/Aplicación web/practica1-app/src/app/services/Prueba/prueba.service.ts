import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class PruebaService {


  users:any [] = [];
  private usersCollection:AngularFirestoreCollection<User>;


  
  constructor(private readonly afs:AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('usuarios');
  }
  
  
  public getUsers():Promise<any>{
    return this.usersCollection.get().toPromise();
   }
  
}
