import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/models/client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient)
  {

  }
  public updateClient()
  {

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
}
