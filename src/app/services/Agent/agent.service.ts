import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Policyterm } from 'src/app/models/policyterm';
import { Agent } from 'src/app/models/agent';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Policy } from 'src/app/models/policy';
import { Company } from 'src/app/models/company';
import { Client } from 'src/app/models/client';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http : HttpClient) { }

  //GetClientPolicy with AgentId
  GetClientPolicies(agentId : number): Observable<Clientpolicy[]>{
    let queries = new HttpParams().append('agentId',agentId);
     return this.http.get<Clientpolicy[]>(environment.baseApiUrl+'/api/Agent/GetClientPolicies',{params : queries});
  }

  //Get Agent Id
  GetAgentId(userID : number) : Observable<Agent>{
    let queries = new HttpParams().append('userId',userID);
    return this.http.get<Agent>(environment.baseApiUrl+'/api/Agent/GetAgent',{params: queries});
  }
  //Get Policy Details
  GetPolicy(policytermId : number) : Observable<Policy>
  {
    let policy : Policy;
    let queries = new HttpParams().append('policytermId',policytermId);
    this.http.get<Policyterm>(environment.baseApiUrl+'/api/Agent/GetPolicyTerms',{params:queries}).subscribe(res  =>{
      let policyId = new HttpParams().append('policyId',res.policyId);
     this.http.get<Policy>(environment.baseApiUrl+'/api/Agent/GetPolicy'+{params: policyId}).subscribe(resp=>{
          policy = resp;
          return of(policy);
      })
    });
    return of(policy);
  }
  //View Policies
  ViewPolicies(companyId : number) : Observable<Policy[]>
  {
    let queries = new HttpParams().append('companyId',companyId);
    return this.http.get<Policy[]>(environment.baseApiUrl+'/api/Agent/GetPolicies',{params: queries});
  }
  //View Companies
  Companies(agentId: number): Observable<Company[]> {
    const queries = new HttpParams().set('agentId', agentId);
    return this.http.get<Company[]>(environment.baseApiUrl + '/api/Agent/GetCompanies', { params: queries });
  }
  //View Clients
  Clients(agentId: number): Observable<Client[]> {
    const queries = new HttpParams().set('agentId', agentId);
    return this.http.get<Client[]>(environment.baseApiUrl + '/api/Agent/GetClients', { params: queries });
  }

  ChangeStatus(status : number,clientpolicyId : number) : Observable<Clientpolicy>
  {
    const formData = new FormData();
    formData.append('status',status.toString());
    formData.append('clientpolicyId',clientpolicyId.toString());
    return this.http.put<Clientpolicy>(environment.baseApiUrl+'/api/Agent/ChangeCpolicyStatus',formData);
  }

}
