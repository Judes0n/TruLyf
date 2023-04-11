import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Policyterm } from 'src/app/models/policyterm';
import { Agent } from 'src/app/models/agent';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Policy } from 'src/app/models/policy';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http : HttpClient) { }
  premiumAmount(policytermId : number) : number
  {
    let policyterm : Policyterm;
    let queries = new HttpParams().append('policytermId',policytermId);
    this.http.get<Policyterm>(environment.baseApiUrl+'/api/Agent/GetPolicyTerms',{params:queries}).subscribe(res  =>{
      policyterm = res;
    });
    return policyterm.premiumAmount;
  }



  GetClientPolicies(agentId : number): Observable<Clientpolicy[]>{
    let queries = new HttpParams().append('agentId',agentId);
     return this.http.get<Clientpolicy[]>(environment.baseApiUrl+'/api/Agent/GetClientPolicies',{params : queries});
  }


  GetAgentId(userID : number) : number{
    let agent : Agent;
    let queries = new HttpParams().append('userId',userID);
    this.http.get<Agent>(environment.baseApiUrl+'/api/Agent/GetAgent',{params: queries}).subscribe(res=>{
      agent = res;
    })
    return agent.agentId;
  }

  policyName(policytermId : number) : string
  {
    let policy : Policy;
    let queries = new HttpParams().append('policytermId',policytermId);
    this.http.get<Policyterm>(environment.baseApiUrl+'/api/Agent/GetPolicyTerms',{params:queries}).subscribe(res  =>{
      let policyId = new HttpParams().append('policyId',res.policyId);
      this.http.get<Policy>(environment.baseApiUrl+'/api/Agent/GetPolicy'+{params: policyId}).subscribe(resp=>{
          policy = resp;
      })
    });
    return policy.policyName;
  }

  policyAmount(policytermId : number) : number
  {
    let policy : Policy;
    let queries = new HttpParams().append('policytermId',policytermId);
    this.http.get<Policyterm>(environment.baseApiUrl+'/api/Agent/GetPolicyTerms',{params:queries}).subscribe(res  =>{
      let policyId = new HttpParams().append('policyId',res.policyId);
      this.http.get<Policy>(environment.baseApiUrl+'/api/Agent/GetPolicy'+{params: policyId}).subscribe(resp=>{
          policy = resp;
      })
    });
    return policy.policyAmount;
  }
}
