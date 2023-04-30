import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTypeEnum } from 'src/app/enum/user-type-enum';
import { Agent } from 'src/app/models/agent';
import { Client } from 'src/app/models/client';
import { Clientdeath } from 'src/app/models/clientdeath';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Company } from 'src/app/models/company';
import { Feedback } from 'src/app/models/feedback';
import { Maturity } from 'src/app/models/maturity';
import { Payments } from 'src/app/models/payment';
import { Policy } from 'src/app/models/policy';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  //Admin Reports
  public Admin_Get_Policies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(environment.baseApiUrl + '/api/Report/Admin-Policies');
  }

  public Admin_Get_Users(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseApiUrl + '/api/Report/Admin-Users');
  }

  public Admin_Get_Actors(usertype: UserTypeEnum): Observable<Company[] | Agent[] | Client[]> {
    return this.http.get<Company[] | Agent[] | Client[]>(environment.baseApiUrl + '/api/Report/Admin-Actors', { params: new HttpParams().append('userType', usertype) });
  }

  public Admin_Get_Maturities(): Observable<Maturity[]> {
    return this.http.get<Maturity[]>(environment.baseApiUrl + '/api/Report/Admin-Maturities');
  }

  public Admin_Get_ClientDeaths(): Observable<Clientdeath[]> {
    return this.http.get<Clientdeath[]>(environment.baseApiUrl + '/api/Report/Admin-ClientDeaths');
  }

  public Admin_Get_Feedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(environment.baseApiUrl + '/api/Report/Admin-Feedbacks');
  }

  //Company Reports

  public Company_Get_Policies(companyId: number): Observable<Policy[]> {
    return this.http.get<Policy[]>(environment.baseApiUrl + '/api/Report/Company-Policies', { params: new HttpParams().append('companyId', companyId) });
  }

  public Company_Get_Agents(companyId: number): Observable<Agent[]> {
    return this.http.get<Agent[]>(environment.baseApiUrl + '/api/Report/Company-Agents', { params: new HttpParams().append('companyId', companyId) });
  }

  public Company_Get_ClientPolicies(companyId: number): Observable<Clientpolicy[]> {
    return this.http.get<Clientpolicy[]>(environment.baseApiUrl + '/api/Report/Company-ClientPolicies', { params: new HttpParams().append('companyId', companyId) });
  }

  public Company_Get_Payments(clientId : number) : Observable<Payments[]> {
    return this.Client_Get_Payments(clientId);
  }

  //Agent Reports

  public Agent_Get_ClientPolicies(agentId: number): Observable<Clientpolicy[]> {
    return this.http.get<Clientpolicy[]>(environment.baseApiUrl + '/api/Report/Agent-ClientPolicies', { params: new HttpParams().append('agentId', agentId) });
  }

  public Agent_Get_Payments(agentId: number): Observable<Payments[]> {
    return this.http.get<Payments[]>(environment.baseApiUrl + '/api/Report/Agent-Payments', { params: new HttpParams().append('agentId', agentId) });
  }

  //Client Reports

  public Client_Get_Payments(clientId: number): Observable<Payments[]> {
    return this.http.get<Payments[]>(environment.baseApiUrl + '/api/Report/Client-Payments', { params: new HttpParams().append('clientId', clientId) });
  }
}
