import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { UserTypeEnum } from 'src/app/enum/user-type-enum';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http : HttpClient) {}

  register(userreq : User) : Observable<User>{
    return this.http.post<User>(environment.baseApiUrl+'/api/User/Register',userreq);
  }

  login(userreq : User) : Observable<User>{
    return this.http.post<User>(environment.baseApiUrl+'/api/User/Login',userreq);
  }
}
