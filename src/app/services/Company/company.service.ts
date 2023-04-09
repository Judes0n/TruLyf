import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'jquery';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  policyterm : Policyterm;
constructor(private http : HttpClient) { }

  GetCompany(userId : number) : Observable<Company>
  {
    let p = new HttpParams().append('userID',userId);
    return this.http.get<Company>(environment.baseApiUrl+'/api/Company/GetCompany',{params: p});
  }

  AddPolicy(policy : Policy)
  {
    this.http.post(environment.baseApiUrl+'/api/Company/AddPolicy',policy).subscribe((res)=>{
      alert("Policy Added Sucessfully\nPlease Add Policy Terms on Next page");
      this.policyterm = {
        policyId : policy.policyId,
        period   : policy.timePeriod,
        policyTermId : 0,
        premiumAmount : policy.policyAmount,
        terms : 1
      }
      this.http.post(environment.baseApiUrl+'/api/Company/AddPolicyTerm',this.policyterm).subscribe();
      console.log(res);
      (error: JSON)=>{
        alert("Error:"+JSON.stringify(error));
      }
  });
  }

  GetPolicy(policyId : number) : Observable<Policy>
  {
    let queries = new HttpParams().append('policyId',policyId);
    let dbpolicy : Observable<Policy> =  this.http.get<Policy>(environment.baseApiUrl+'/api/Company/GetPolicy',{params : queries});
    return dbpolicy;
  }

  AddPolicyTerm(policyterm : Policyterm){
    this.http.post(environment.baseApiUrl+'/api/Company/AddPolicyTerm',policyterm).subscribe(res=>{
      alert("Policy Term Added Successfully");
    });
  }

}
