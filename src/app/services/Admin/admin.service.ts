import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseApiUrl : string = environment.baseApiUrl;
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
