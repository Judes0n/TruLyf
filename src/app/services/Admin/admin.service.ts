import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { Feedback } from 'src/app/models/feedback';
import { Maturity } from 'src/app/models/maturity';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
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
      this.http.put(environment.baseApiUrl+'/api/Admin/ChangeUserStatus',res).subscribe();
    });
  }


  Block(userId : number)
  {
    this.userservice.GetUser(userId).subscribe((res)=>{
      res.status=StatusEnum.Blocked;
      this.http.put(environment.baseApiUrl+'/api/Admin/ChangeUserStatus',res).subscribe();
    });
  }

  ViewAllTypes() : Observable<Policytype[]>
  {
    return this.http.get<Policytype[]>(this.baseApiUrl+'/api/Admin/GetAllTypes');
  }

  ViewAllPolicies() : Observable<Policy[]>
  {
    return this.http.get<Policy[]>(this.baseApiUrl+'/api/Admin/GetAllPolicies');
  }

  ViewAllMaturities() : Observable<Maturity[]>
  {
    return this.http.get<Maturity[]>(this.baseApiUrl+'/api/Admin/GetAllMaturities');
  }

  ViewFeedbacks() : Observable<Feedback[]>
  {
    return this.http.get<Feedback[]>(this.baseApiUrl+'/api/Admin/GetFeedbacks');
  }

  ViewPolicyterm(policyId : number): Observable<Policyterm[]>
  {
    let prmtrs = new HttpParams().append('policyId',policyId);
    return this.http.get<Policyterm[]>(this.baseApiUrl+'/api/Admin/GetPolicyTerms',{params: prmtrs});
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

  ApprovePolicy(policyId : number) : void
  {
    let queries = new HttpParams().append('policyId',policyId);
    this.http.get<Policy>(environment.baseApiUrl,{params: queries}).subscribe((res)=>{
      res.status = StatusEnum.Active;
      this.http.put(environment.baseApiUrl+'/api/Admin/ChangePolicyStatus',res).subscribe(res=>{
        alert("User Approved");
      });
    });
  }


  BlockPolicy(policyId : number)
  {
    let queries = new HttpParams().append('policyId',policyId);
    this.http.get<Policy>(environment.baseApiUrl,{params: queries}).subscribe((res)=>{
      res.status = StatusEnum.Blocked;
      this.http.put(environment.baseApiUrl+'/api/Admin/ChangePolicyStatus',res).subscribe(res=>{
        alert("User Approved");
      });
    });
  }

}
