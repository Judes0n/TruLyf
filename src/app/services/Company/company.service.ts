import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Policy } from 'src/app/models/policy';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

constructor(private http : HttpClient) { }

  GetCompany(userId : number) : Observable<Company>
  {
    return this.http.get<Company>(environment.baseApiUrl+'/api/Company/GetCompany');
  }

  AddPolicy(policy : Policy)
  {
    this.http.post(environment.baseApiUrl+'/api/Company/AddPolicy',policy).subscribe();
  }
}
