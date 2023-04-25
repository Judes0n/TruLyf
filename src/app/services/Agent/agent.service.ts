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
import { Clientdeath } from 'src/app/models/clientdeath';
import { Maturity } from 'src/app/models/maturity';
import { Premium } from 'src/app/models/premium';
import { Agentcompany } from 'src/app/models/agentcompany';

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
     this.http.get<Policyterm>(environment.baseApiUrl+'/api/Agent/GetPolicyTerms',{params:new HttpParams().append('policytermId',policytermId)}).subscribe(res  =>{
     this.http.get<Policy>(environment.baseApiUrl+'/api/Agent/GetPolicy',{params: new HttpParams().append('policyId',res.policyId)}).subscribe(resp=>{
          policy = resp;
          return of(policy);
      })
    });
    return of(policy);
  }
  //Get Policy Term
  GetPolicyTerm(policytermId : number) : Observable<Policyterm>
  {
    let queries = new HttpParams().append('policytermId',policytermId);
    return this.http.get<Policyterm>(environment.baseApiUrl+'/api/Agent/GetPolicyTerms',{params:queries});
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

  AddClientDeath(clientdeath : Clientdeath)
  {
    this.http.post(environment.baseApiUrl+'/api/Agent/AddClientDeath',clientdeath).subscribe(res=>{
      alert("Client Death Registered!");
    });
  }

  AddMaturity(maturity : Maturity)
  {

    this.http.post(environment.baseApiUrl+'/api/Agent/AddMaturity',maturity).subscribe(res=>{
      alert("Maturity Registered!");
    });
  }

  AddPenalty(premium : Premium)
  {

    this.http.post(environment.baseApiUrl+'/api/Agent/AddPenalty',premium).subscribe(res=>{
      alert("Penalty Registered!");
    });
  }

  GetRefs(agentId : number,companyId : number) : Observable<Agentcompany>
  {
    let queries = new HttpParams().set('agentId', agentId).set('companyId',companyId);
    return this.http.get<Agentcompany>(environment.baseApiUrl+'/api/Agent/GetRefs',{params: queries});
  }
}
