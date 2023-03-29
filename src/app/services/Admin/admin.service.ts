import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { Policy } from 'src/app/models/policy';
import { Policytype } from 'src/app/models/policytype';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseApiUrl : string = environment.baseApiUrl;
  ptype : Policytype;
  constructor(private http : HttpClient,private router : Router ,private userservice : UserService) { }


  getAllUsers() : Observable<User[]>
  {
   return this.http.get<User[]>(this.baseApiUrl+'/api/User/GetAllUsers');
  }


  Approve(userId : number) : void
  {

    this.userservice.GetUser(userId).subscribe((res)=>{
      res.status = StatusEnum.Active;
      this.http.put(environment.baseApiUrl+'/api/Admin/ChangeUserStatus',res).subscribe(res=>{
        alert("User Approved");
      });
    });
    alert("User Approved");
  }


  Block(userId : number)
  {
    this.userservice.GetUser(userId).subscribe((res)=>{
      res.status=StatusEnum.Blocked;
      this.http.put(environment.baseApiUrl+'/api/Admin/ChangeUserStatus',res).subscribe(res=>{
        alert("User Blocked");
      });
    });
    alert("User Blocked");
  }

  ViewAllTypes() : Observable<Policytype[]>
  {
    return this.http.get<Policytype[]>(this.baseApiUrl+'/api/Admin/GetAllTypes');
  }

  ViewAllPolicies() : Observable<Policy[]>
  {
    return this.http.get<Policy[]>(this.baseApiUrl+'/api/Admin/GetAllPolicies');
  }

  AddPolicyType(typeName : string)
  {
    this.ptype = {
      policytypeId : 0,
      policytypeName : typeName
    }
    console.log(this.ptype);
    this.http.post(environment.baseApiUrl+'/api/Admin/AddPolicyType',this.ptype).subscribe({next:(res)=>{
      console.log(res);
    },
    error:(error)=>{
      console.log(JSON.stringify(error));
    }});
    alert("Policy Type Added");
  }
}
