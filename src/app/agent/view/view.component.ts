import { Component, OnInit } from '@angular/core';
import { Agentcompany } from 'src/app/models/agentcompany';
import { Client } from 'src/app/models/client';
import { Company } from 'src/app/models/company';
import { Policy } from 'src/app/models/policy';
import { AgentService } from 'src/app/services/Agent/agent.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class AgentViewComponent implements OnInit {
  choice: number;
  clients: Client[] = [];
  companies: Company[] = [];
  policies: Policy[] = [];
  private allpolicies: Policy[] = [];
  agentId : number;

  constructor(private agentservies: AgentService) { }

  ngOnInit(): void {
    this.choice = 1;
    this.companies = [];
    this.policies = [];
    this.agentservies.GetAgentId(+this.readSession('userID')).subscribe(response => {
      this.agentId=response.agentId;
      this.agentservies.Companies(response.agentId).subscribe(res => {
        res.forEach(company => {
          if (company.status == 1) {
            this.companies.push(company);
          }
        });
      });
      //clients[] init
      this.agentservies.Clients(response.agentId).subscribe(resp => {
        this.clients = resp;
      })
    })
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  ChangeChoice(ch: number) {
    this.choice = ch;
  }

  updatePolicies(cid: number) {
    this.policies = [];
    this.agentservies.ViewPolicies(cid).subscribe((res) => {
      this.allpolicies = res;
      this.allpolicies.forEach(policy => {
        if (policy.status == 1) {
          this.policies.push(policy);
        }
      });
    });
  }
  GetReferral(companyId : number)
  {
    this.agentservies.GetRefs(this.agentId,companyId).subscribe((res : Agentcompany)=>{
    navigator.clipboard.writeText(res.referral).then(() => {alert(`Successfully copied Referral code to clipboard`);}).catch((error) =>{console.error(`Failed to copy ${res.referral} to clipboard: ${error}`);
  });
   });
  }
}
