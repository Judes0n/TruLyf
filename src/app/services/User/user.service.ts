import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { error, map } from 'jquery';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { UserTypeEnum } from 'src/app/enum/user-type-enum';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  dbuser: Observable<User>;
  constructor(private http: HttpClient, private router: Router) {}

  register(userreq: User): Observable<User> {
    this.http
      .post(environment.baseApiUrl + '/api/User/Register', userreq)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('Error' + error);
        }
      );
    return null;
  }

  login(userreq: User) {
    if (userreq == null) {
      console.log("Request Data is Faulty");
      return;
    }
    this.http
      .post<User>(environment.baseApiUrl + '/api/User/Login', userreq)
      .subscribe(
        (response) => {
          if (response == null) {
            console.log('Fetch Failed');
          } else {
            console.log(response);
            if (response.status == StatusEnum.Active) {
              switch (response.type) {
                case UserTypeEnum.Client: {
                  sessionStorage.setItem('log_role', 'client');
                  sessionStorage.setItem('userID', response.userId.toString());
                  setTimeout(() => {
                    this.router.navigate(['/Home/Client']);
                  });
                  break;
                }
                case UserTypeEnum.Agent: {
                  sessionStorage.setItem('log_role', 'agent');
                  sessionStorage.setItem('userID', response.userId.toString());
                  setTimeout(() => {
                    this.router.navigate(['/Home/Agent']);
                  });
                  break;
                }
                case UserTypeEnum.Company: {
                  sessionStorage.setItem('log_role', 'company');
                  sessionStorage.setItem('userID', response.userId.toString());
                  setTimeout(() => {
                    this.router.navigate(['/Home/Company']);
                  });
                  break;
                }
                case UserTypeEnum.Admin: {
                  sessionStorage.setItem('log_role', 'admin');
                  sessionStorage.setItem('userID', response.userId.toString());
                  setTimeout(() => {
                    this.router.navigate(['/Home/Admin']);
                  });
                }
              }
            } else if (response.status == StatusEnum.Blocked) {
              console.log('User Access is Blocked!!');
            } else {
              console.log(
                'User Access is Denied,Please wait until your request is approved'
              );
            }
          }
        },
        (error) => {
          console.log('Login Error :' + JSON.stringify(error));
        }
      );
  }


  getuser(userName: string) {
    this.http
      .put<User>(environment.baseApiUrl + '/api/User/GetUser', userName)
      .subscribe(
        (res) => {
          return res;
        },
        (error) => {
          console.log('Error:' + error);
        }
      );
  }
}
