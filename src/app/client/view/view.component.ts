import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Maturity } from 'src/app/models/maturity';
import { Nominee } from 'src/app/models/nominee';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ClientViewComponent implements OnInit {

  choice: number;
  cpolicies: Clientpolicy[];
  mpolicies: Maturity[];
  nominees: Nominee[];
  agents: Agent[];
  policies: Policy[];
  policyterms: Policyterm[];
  loaded: boolean;
  constructor(private clientservice: ClientService) { }

  async ngOnInit() {
    let clientId = (await this.clientservice.GetClientById(+this.readSession('userID')).toPromise()).clientId;
    this.choice = 1;
    this.cpolicies = [];
    this.mpolicies = [];
    this.nominees = [];
    this.agents = [];
    this.policies = [];
    this.policyterms = [];
    this.loaded = false;
    this.clientservice.ViewNominees(clientId).subscribe(res => {
      this.nominees = res;
    });

    this.clientservice.GetCPolicy(clientId).subscribe(res => {
      res.forEach(cpol => {
        if (cpol.status < 3)
          this.cpolicies.push(cpol);
        this.clientservice.GetPolicyTerm(cpol.policyTermId).subscribe(pterm => {
          this.policyterms.push(pterm);
          this.clientservice.GetPolicy(pterm.policyId).subscribe(pol => {
            this.policies.push(pol);
          });
        });
        this.clientservice.GetAgent(cpol.agentId).subscribe(agent => {
          this.agents.push(agent);
        });
      });
    });
    //this.clientservice.
    this.clientservice.GetMPolicies(clientId).subscribe(res => {
      this.mpolicies = res;
    });
    this.loaded = true;
  }

  ChangeChoice(choice: number) {
    this.choice = choice;
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  ReadNomineeName(nomineeId: number): string {
    let n = this.nominees.find(n => n.nomineeId == nomineeId);
    if (n != null)
      return n.nomineeName;
    else return "";
  }

  ReadAgentName(agentId: number): string {
    let a = this.agents.find(a => a.agentId == agentId);
    if (a != null) return a.agentName;
    else return "";
  }

  ReadPolicyName(policytermId: number): string {
    let pt = this.policyterms.find(pt => pt.policyTermId == policytermId);
    if (pt != null) {
      let a = this.policies.find(p => p.policyId == pt.policyId);
      if (a != null)
        return a.policyName;
      else return "";
    }
    else return "";
  }

  ReadPremium(policytermId: number): number {
    let t = this.policyterms.find(pt => pt.policyTermId == policytermId);
    if (t != null)
      return t.premiumAmount;
    else return 0;
  }

  ReadTotalTerm(policytermId: number): number {
    let m = this.policyterms.find(pt => pt.policyTermId == policytermId);
    if (m != null)
      return m.terms;
    else
      return 0;
  }
}
