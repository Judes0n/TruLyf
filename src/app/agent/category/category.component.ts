import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Agent } from 'src/app/models/agent';
import { Client } from 'src/app/models/client';
import { Clientdeath } from 'src/app/models/clientdeath';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Maturity } from 'src/app/models/maturity';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { Premium } from 'src/app/models/premium';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  choice: number;
  cpolicies: Clientpolicy[] = [];
  policies: Policy[] = [];
  policyterms: Policyterm[] = [];
  clients: Client[] = [];
  dataLoaded = false;
  constructor(private agentservices: AgentService, private http: HttpClient) { }

  async ngOnInit() {
    this.choice = 1;
    let agentId: number;
    this.cpolicies = this.clients = this.policies = this.policyterms = [];
    agentId = +this.readSession('agentId');
    this.cpolicies = await this.agentservices.GetClientPolicies(agentId).toPromise();
    console.log(this.cpolicies);
    if (this.cpolicies != null) {
      const policyTermRequests = this.cpolicies.map(cpolicy => {
        return this.agentservices.GetPolicyTerm(cpolicy.policyTermId).toPromise();
      });
      const policyRequests = this.cpolicies.map(cpolicy => {
        return this.agentservices.GetPolicy(cpolicy.policyTermId).toPromise();
      });
      this.clients = await this.agentservices.Clients(agentId).toPromise();
      const pts = await Promise.all(policyTermRequests);
      const ps = await Promise.all(policyRequests);
      pts.forEach(pt => {
        this.policyterms.push(pt);
      });
      ps.forEach(p => {
        this.policies.push(p);
      });
      console.log(this.clients);
    }
    this.dataLoaded = true;
  }

  ChangeChoice(ch: number) {
    this.choice = ch;
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  ReadTotalTurns(policytermId: number): number {
    let policyterm = this.policyterms.find(p => p.policyTermId == policytermId);
    return policyterm.terms;
  }

  ReadPolicyAmount(policytermId: number): number {
      var policyId = this.policyterms.find(pt => pt.policyTermId == policytermId).policyId;
      var res = this.policies.find(p => p.policyId == policyId);
      if(res != null)
      {
      return res.policyAmount;
      }
      else return 0;
  }

  ReadClientName(clientId: number): string {
    let client = this.clients.find(c => c.clientId == clientId);
    return client.clientName;
  }

  regClientDeath(clientpolicyId: number) {
    let clientdeath: Clientdeath;
    let currentDate: Date = new Date();
    let cp = this.cpolicies.find(cp => cp.clientPolicyId == clientpolicyId);
    let pt = this.policyterms.find(p => p.policyTermId == cp.policyTermId);
    let p = this.policies.find(p => p.policyId == pt.policyId);
    clientdeath = {
      clientDeathId: 0,
      clientPolicyId: clientpolicyId,
      dod: currentDate.toString(),
      startDate: cp.startDate,
      claimAmount: (p.policyAmount * 1.75)
    };
    if (window.confirm("You Are About to Mark ClientPolicy with ID: '" + clientdeath.clientPolicyId + "' as Deprecated(ClientDeath)\nAction cannot be Undone")) {
      this.agentservices.AddClientDeath(clientdeath);
      this.ngOnInit();
    }
    else {
      alert("Action Cancelled");
      this.ngOnInit();
    }
  }

  regMaturity(cp: Clientpolicy) {
    let currentDate = new Date();
    let pt = this.policyterms.find(p => p.policyTermId == cp.policyTermId);
    let p = this.policies.find(p => p.policyId == pt.policyId);
    let maturepolicy: Maturity = {
      maturityId: 0,
      clientPolicyId: cp.clientPolicyId,
      maturityDate: currentDate.toString(),
      claimAmount: p.policyAmount * 1.2,
      startDate: cp.startDate
    };
    if (window.confirm("You Are About to Mark ClientPolicy with ID: '" + maturepolicy.clientPolicyId + " as Mature\nAction cannot be Undone")) {
      this.agentservices.AddMaturity(maturepolicy);
      this.ngOnInit();
    }
    else {
      alert("Action Cancelled");
      this.ngOnInit();
    }
  }

  regPenalty(cp: Clientpolicy) {
    let currentDate = new Date();
    let pt = this.policyterms.find(p => p.policyTermId == cp.policyTermId);
    let penalty: number;
    if (pt.terms < 6) {
      penalty = pt.premiumAmount * 0.3;
    }
    else {
      penalty = pt.premiumAmount * 2;
    }
    let premium: Premium = {
      premiumId: 0,
      clientPolicyId: cp.clientPolicyId,
      dateOfCollection: currentDate.toString(),
      penality: penalty
    };
    if (window.confirm("You Are About to Impose ClientPolicy with ID: '" + premium.clientPolicyId + "' ,a penalty of '₹" + premium.penality + "'\nAction cannot be Undone")) {
      this.agentservices.AddPenalty(premium);
      this.ngOnInit();
    }
    else {
      alert("Action Cancelled");
      this.ngOnInit();
    }

  }
}
