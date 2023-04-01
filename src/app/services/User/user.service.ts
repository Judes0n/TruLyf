import { HttpClient, HttpParams } from '@angular/common/http';
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
  constructor(private http: HttpClient, private router: Router) { }

  //Register
  register(userreq: User, file: File, email: string, gender: string) {
    const formData = new FormData();
    formData.append('pic', file);
    formData.append('email', email);
    if(userreq.type != 1)
    {
    formData.append('gender', gender);
    }
    for (const key in userreq) {
      if (userreq.hasOwnProperty(key)) {
        formData.append(key, userreq[key]);
      }
    }
    this.http.post(environment.baseApiUrl + '/api/User/Register', formData).subscribe(
      (response : User) => {
        alert(response.userName+" Registered Sucessfully");
        this.router.navigate(['/Login']);
      }
    );
  }


  //Login Function
  login(userreq: User) {
    if (userreq == null) {
      console.log("Request Data is Faulty");
      return;
    }
    this.http.post<User>(environment.baseApiUrl + '/api/User/Login', userreq).subscribe((response : User) => {
      if (response == null) {
        alert('Fetch Failed');
      }
      else {
        console.log(response);
         if (response.type == UserTypeEnum.Admin) {
          sessionStorage.setItem('log_role', 'admin');
          sessionStorage.setItem('userID', response.userId.toString());
          setTimeout(() => {
            this.router.navigate(['/Home/Admin']);
          });
         }
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
          }
        } else if (response.status == StatusEnum.Blocked) {
          alert('User Access is Blocked!!');
        } else {
          alert('User Access is Denied,Please wait until your request is approved');
        }
      }
    },
      (error) => {
        alert('Invalid Credentials');
      }
    );
  }
  //FileUpload
  uploadFile(file: File): string {
    const formData = new FormData();
    formData.append('pic', file);
    var dbpath: string;
    this.http.post(environment.baseApiUrl + '/api/User/Upload', formData).subscribe((res: any) => {
      dbpath = res;
    });
    return dbpath;
  }

  GetUserByName(username : string) : Observable<User>
  {
    let queryParams = new HttpParams().append('username',username);
    this.http.get(environment.baseApiUrl+'/api/User/GetUserByName',{params: queryParams}).subscribe((res)=>{
      return res;
    },
    (error)=>{
      console.log(JSON.stringify(error));
    });
    return null;
  }

  GetUser(userId : number): Observable<User>{
    let queryParams = new HttpParams().append('userId',userId);
    return this.http.get<User>(environment.baseApiUrl+'/api/User/GetUser',{params: queryParams});
  }
}
