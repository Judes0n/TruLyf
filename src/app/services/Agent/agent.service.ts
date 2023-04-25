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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient, private route: Router) { }

  //GetClientPolicy with AgentId
  GetClientPolicies(agentId: number): Observable<Clientpolicy[]> {
    let queries = new HttpParams().append('agentId', agentId);
    return this.http.get<Clientpolicy[]>(environment.baseApiUrl + '/api/Agent/GetClientPolicies', { params: queries });
  }

  //Get Agent Id
  GetAgentId(userID: number): Observable<Agent> {
    let queries = new HttpParams().append('userId', userID);
    return this.http.get<Agent>(environment.baseApiUrl + '/api/Agent/GetAgent', { params: queries });
  }
  //Get Policy Details
  async GetPolicy(policytermId: number): Promise<Observable<Policy>> {
    var policy = await this.http.get<Policyterm>(environment.baseApiUrl + '/api/Agent/GetPolicyTerms', { params: new HttpParams().append('policytermId', policytermId) }).toPromise();
    return this.http.get<Policy>(environment.baseApiUrl + '/api/Agent/GetPolicy', { params: new HttpParams().append('policyId', policy.policyId) });
  }
  //Get Policy Term
  GetPolicyTerm(policytermId: number): Observable<Policyterm> {
    let queries = new HttpParams().append('policytermId', policytermId);
    return this.http.get<Policyterm>(environment.baseApiUrl + '/api/Agent/GetPolicyTerms', { params: queries });
  }

  //View Policies
  ViewPolicies(companyId: number): Observable<Policy[]> {
    let queries = new HttpParams().append('companyId', companyId);
    return this.http.get<Policy[]>(environment.baseApiUrl + '/api/Agent/GetPolicies', { params: queries });
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

  ChangeStatus(status: number, clientpolicyId: number): Observable<Clientpolicy> {
    const formData = new FormData();
    formData.append('status', status.toString());
    formData.append('clientpolicyId', clientpolicyId.toString());
    return this.http.put<Clientpolicy>(environment.baseApiUrl + '/api/Agent/ChangeCpolicyStatus', formData);
  }

  AddClientDeath(clientdeath: Clientdeath) {
    const formData = new FormData();
    for (const prop in clientdeath) {
      if (clientdeath.hasOwnProperty(prop)) {
        formData.append(prop, clientdeath[prop]);
      }
    }
    this.http.post(environment.baseApiUrl + '/api/Agent/AddClientDeath', formData).subscribe((res: Clientdeath) => {
      if (res.clientDeathId == 0) {
        alert("Client Death Registeration Failed!");
        this.route.navigate[("/Home/Agent")];
      }
      else {
        alert("Death Registered!");
        this.route.navigate(["/Agent/ClientPolicies"]);
      }
    });
  }

  AddMaturity(maturity : Maturity) {
    const formData = new FormData();
    for (const prop in maturity) {
      if (maturity.hasOwnProperty(prop)) {
        formData.append(prop, maturity[prop]);
      }
    }
    this.http.post(environment.baseApiUrl + '/api/Agent/AddMaturity', formData).subscribe((res: Maturity) => {
      if (res.maturityId == 0) {
        alert("Maturity Registeration Failed!");
        this.route.navigate[("/Home/Agent")];
      }
      else {
        alert("Maturity Registered!");
        this.route.navigate(["/Agent/ClientPolicies"]);
      }
    });
  }

  AddPenalty(premium : Premium) {
    const formData = new FormData();
    for (const prop in premium) {
      if (premium.hasOwnProperty(prop)) {
        formData.append(prop, premium[prop]);
      }
    }
    this.http.post(environment.baseApiUrl + '/api/Agent/AddPenalty', formData).subscribe((res: Premium) => {
      if (res.premiumId == 0) {
        alert("Action Failed!");
        this.route.navigate[("/Home/Agent")];
      }
      else {
        alert('Action Success!!')
        this.route.navigate(["/Agent/ClientPolicies"]);
      }
    });
  }

  GetRefs(agentId: number, companyId: number): Observable<Agentcompany> {
    let queries = new HttpParams().set('agentId', agentId).set('companyId', companyId);
    return this.http.get<Agentcompany>(environment.baseApiUrl + '/api/Agent/GetRefs', { params: queries });
  }
}
