import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'jquery';
import { Observable, of } from 'rxjs';
import { Agentcompany } from 'src/app/models/agentcompany';
import { Client } from 'src/app/models/client';
import { Company } from 'src/app/models/company';
import { Nominee } from 'src/app/models/nominee';
import { Policy } from 'src/app/models/policy';
import { Policytype } from 'src/app/models/policytype';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {

  }
  public ViewNominees(clientId: number): Observable<Nominee[]> {
    let queries = new HttpParams().append('clientId', clientId);
    return this.http.get<Nominee[]>(environment.baseApiUrl + '/api/Client/ViewNominee', { params: queries });
  }

  public GetClient(clientId: number): Observable<Client> {
    let queries = new HttpParams().append('clientId', clientId);
    return this.http.get<Client>(environment.baseApiUrl + '/api/Client/GetClient', { params: queries });
  }

  GetClientById(userId: number): Observable<Client> {
    let queries = new HttpParams().append('userId', userId);
    return this.http.get<Client>(environment.baseApiUrl + '/api/Client/GetClientById', { params: queries });
  }

  public AddNominee(nominee: Nominee) {
    const formData = new FormData();
    for (const prop in nominee) {
      if (nominee.hasOwnProperty(prop)) {
        formData.append(prop, nominee[prop]);
      }
    }
    this.http.post(environment.baseApiUrl + '/api/Client/AddNominee', formData).subscribe(res => {
      alert('Nominee Added Successfully');
    },
      error => {
        console.log(error);
        alert('Action Failed : ' + JSON.stringify(error));

      });
  }

  public GetPolicies(policytypeId: number, agentId: number, order: number): Observable<Policy[]> {
    let queries = new HttpParams().set('policytypeId',policytypeId).set('agentId',agentId).set('order',order);
    return this.http.get<Policy[]>(environment.baseApiUrl + '/api/Client/ViewPolicies', { params: queries });
  }

  public GetType() : Observable<Policytype[]>
  {
    return this.http.get<Policytype[]>(environment.baseApiUrl+'/api/Client/GetTypes');
  }

  public GetCompanies() : Observable<Company[]>
  {
    return this.http.get<Company[]>(environment.baseApiUrl+'/api/Client/GetCompanies');
  }

  public GetPolicy(policyId : number) : Observable <Policy>
  {
    return this.http.get<Policy>(environment.baseApiUrl+'/api/Admin/GetPolicy',{params : new HttpParams().append("policyId",policyId)});
  }

  public ValidateRef(ref : string) : Observable<Agentcompany>
  {
    let result : Agentcompany;
    this.http.get(environment.baseApiUrl+'/api/Client/ValidateReferral',{params : new HttpParams().append('referral',ref)}).subscribe((res : Agentcompany)=>{
      result = res;
    },
    error=>{
      console.log('Error'+JSON.stringify(error));
    });
    return of(result);
  }
}
