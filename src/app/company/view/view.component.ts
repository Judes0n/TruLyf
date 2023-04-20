import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'jquery';
import { Observable, mapTo } from 'rxjs';
import { Agent } from 'src/app/models/agent';
import { Agentcompany } from 'src/app/models/agentcompany';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { CompanyService } from 'src/app/services/Company/company.service';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class CompanyViewComponent implements OnInit {
  choice: number;
  agents: Agentcompany[] = [];
  policies: Policy[] = [];
  compId: number;
  agentNames: Agent[] = [];
  pterms : Policyterm[] = [];

  constructor(private adminservice: AdminService, private companyservice: CompanyService, private http: HttpClient) { }
  ngOnInit() {
    this.choice = 1;
    let cid: number;
    this.companyservice.GetCompany(+this.readSession('userID')).subscribe(resp => {
      cid = resp.companyId;
      this.companyservice.GetAgents(cid).subscribe(response => {
        this.agents = response;
      });
      this.adminservice.ViewAllPolicies().subscribe(res => {
        if (res.find(a => a.companyId == resp.companyId)) {
          this.policies = res;
        }
      });

      this.AgentNames(resp.companyId).subscribe(agents => {
        this.agentNames = agents;
      })
    });
  }
  AgentNames(companyId: number): Observable<Agent[]> {
    const queries = new HttpParams().set('companyId', companyId);
    return this.http.get<Agent[]>(environment.baseApiUrl + '/api/Agent/GetAgentsById', { params: queries });
  }

  readAgentName(agentId : number) : string
  {
    let aname : Agent = this.agentNames.find(a=>a.agentId == agentId);
    if(aname != null)
    {
    return aname.agentName;
    }
    else
    return null;
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  ChangeChoice(ch: number) {
    this.choice = ch;
  }

  ChangeStatus(status : number,Id : number)
  {
    this.companyservice.ChangeStatus(status,Id);
  }

  ChangePolicyStatus(policyId : number, status : number)
  {
    this.companyservice.ChangePolicyStatus(status,policyId);
  }

  updateTerms(pid : number)
  {
    this.adminservice.ViewPolicyterm(pid).subscribe(res => {
      this.pterms = res;
    });
  }
}
