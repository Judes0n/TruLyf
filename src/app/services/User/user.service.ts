import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  dbuser : Observable<User>;
  constructor(private http : HttpClient) {}

  register(userreq : User) : Observable<User>{
    console.log(this.http.post(environment.baseApiUrl+'/api/User/Register',userreq));
    return null;
  }

  login(userreq : User) : Observable<User>{
   console.log(this.http.post<User>(environment.baseApiUrl+'/api/User/Login',userreq));
    this.dbuser = this.http.post<User>(environment.baseApiUrl+'/api/User/Login',userreq);
    return null;
  }

  getuser(userName : string) : Observable<User>{
    return this.http.put<User>(environment.baseApiUrl+'/api/User/GetUser',userName);
  }
}
