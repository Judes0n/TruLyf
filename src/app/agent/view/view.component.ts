import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Company } from 'src/app/models/company';
import { Policy } from 'src/app/models/policy';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class AgentViewComponent implements OnInit {
  choice : number;
  clients : Client[] = [];
  companies : Company[] = [];
  policies : Policy[] = [];

  constructor(private agentservies : AgentService,private http : HttpClient){}

  ngOnInit(): void {
    this.choice = 1;
    this.agentservies.GetAgentId(+this.readSession('userID')).subscribe(response=>{

      this.Companies(response.agentId).subscribe(res=>{
        this.companies = res;
      });
      //clients[] init
    })
    }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }

  ChangeChoice(ch : number)
  {
    this.choice = ch;
  }

  updatePolicies(cid : number)
  {
    this.agentservies.ViewPolicies(cid).subscribe((res) => {
      this.policies = res;
    });
  }

  Companies(agentId: number): Observable<Company[]> {
    const queries = new HttpParams().set('agentId', agentId);
    return this.http.get<Company[]>(environment.baseApiUrl + '/api/Agent/GetCompanies', { params: queries });
  }

}
