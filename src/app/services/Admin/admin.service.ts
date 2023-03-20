import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseApiUrl : string ="https://localhost:7037";
  constructor(private http : HttpClient) { }
  getAllUsers() : Observable<User[]> {
   return this.http.get<User[]>(this.baseApiUrl+'/api/User/GetAllUsers');
  }
  getUsersByID() {

  }
  addUser() {

  }
  updateUser() {

    }

  removeUser() {

  }
}
