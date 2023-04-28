import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { Agent } from 'src/app/models/agent';
import { Client } from 'src/app/models/client';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-clientpolicies',
  templateUrl: './clientpolicies.component.html',
  styleUrls: ['./clientpolicies.component.scss']
})
export class ClientpoliciesComponent implements OnInit {
  cpolicies: Clientpolicy[];
  clientName: string;
  policies: Policy[];
  policyterms: Policyterm[];
  clients: Client[];
  dataLoaded = false;

  constructor(private agentservices: AgentService) { }

  async ngOnInit() {
    let agentId: number;
    this.dataLoaded = false;
    this.cpolicies = null;
    this.clients = [];
    this.policies = [];
    this.policyterms = [];
    agentId = +this.readSession('agentId');
    this.cpolicies = await this.agentservices.GetClientPolicies(agentId).toPromise();
    if (this.cpolicies != null) {
      const policyTermRequests = this.cpolicies.map(cpolicy => {
        return this.agentservices.GetPolicyTerm(cpolicy.policyTermId).toPromise();
      });
      const policyRequests = this.cpolicies.map(async cpolicy => {
        return await this.agentservices.GetPolicy(cpolicy.policyTermId);
      });
      this.clients = await this.agentservices.Clients(agentId).toPromise();
      const pts = await Promise.all(policyTermRequests);
      const ps = await Promise.all(policyRequests);
      pts.forEach(pt => {
        this.policyterms.push(pt);
      });
      ps.forEach(p => p.subscribe(res => {
        this.policies.push(res);
      }));
      console.log(this.policyterms);
    }
    this.dataLoaded = true;
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  ChangeStatus(status: number, cpid: number) {
    this.agentservices.ChangeStatus(status, cpid).subscribe(res => {
      alert("Status Updated!");
      this.ngOnInit();
    },
      error => {
        alert("Error: " + JSON.stringify(error));
      });
  }
  ReadPolicyAmount(policytermId: number): number {
    var policy = this.policyterms.find(pt => pt.policyTermId == policytermId);
    return this.policies.find(p => p.policyId == policy.policyId).policyAmount;

  }

  ReadPolicyName(policytermId: number): string {
    var policy = this.policyterms.find(pt => pt.policyTermId == policytermId);
    return this.policies.find(p => p.policyId == policy.policyId).policyName;
  }

  ReadPremiumAmount(policytermId: number): number {
    var policyterm = this.policyterms.find(pt => pt.policyTermId == policytermId);
    if (policyterm != null)
      return policyterm.premiumAmount;
    else
      return 0;
  }

  ReadClientName(clientId: number): string {
    let client = this.clients.find(c => c.clientId == clientId);
    if (client != null)
      return client.clientName;
    else return "1";
  }
}
