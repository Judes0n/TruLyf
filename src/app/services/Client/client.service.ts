import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'jquery';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Nominee } from 'src/app/models/nominee';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient)
  {

  }
  public ViewNominees(clientId : number) : Observable<Nominee[]>
  {
    let queries = new HttpParams().append('clientId',clientId);
    return this.http.get<Nominee[]>(environment.baseApiUrl+'',{params : queries});
  }

  public GetClient(clientId : number) : Observable<Client>
  {
    let dbclient : Client;
    let queries = new HttpParams().append('clientId',clientId);
    this.http.get<Client>(environment.baseApiUrl+'/api/Client/GetClient',{params : queries}).subscribe(res=>{
      dbclient = res;
    });
    return of(dbclient);
  }

  public GetClientById(userId : number) : Observable<Client>
  {
    let dbclient : Client;
    let queries = new HttpParams().append('userId',userId);
    this.http.get<Client>(environment.baseApiUrl+'/api/Client/GetClientById',{params : queries}).subscribe(res=>{
      dbclient = res;
    });
    return of(dbclient);
  }

  public AddNominee(nominee : Nominee)
  {
    this.http.post(environment.baseApiUrl+'/api/Client/AddNominee',nominee).subscribe(res=>{
      alert('Nominee Added Successfully');
    },
    error=>{
      alert('Action Failed : '+JSON.stringify(error));
    });
  }
}
