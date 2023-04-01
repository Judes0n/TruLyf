import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'jquery';
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
    let p = new HttpParams().append('userID',userId);
    return this.http.get<Company>(environment.baseApiUrl+'/api/Company/GetCompany',{params: p});
  }

  AddPolicy(policy : Policy)
  {
    this.http.post(environment.baseApiUrl+'/api/Company/AddPolicy',policy).subscribe({next:(res)=>{
      alert("Policy Added Sucessfully\nPlease Add Policy Terms on Next page");
      console.log(res);
      error: (error)=>{
        alert("Error:"+error);
      }
  }});
  }
}
