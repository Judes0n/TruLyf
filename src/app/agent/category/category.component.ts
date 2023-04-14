import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Clientdeath } from 'src/app/models/clientdeath';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Maturity } from 'src/app/models/maturity';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { Premium } from 'src/app/models/premium';
import { AgentService } from 'src/app/services/Agent/agent.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  choice : number;
  cpolicies : Clientpolicy[] = [];
  policies : Policy[] = [];
  policyterms : Policyterm[] = [];
  clients : Client[] = [];

  constructor(private agentservices : AgentService) {}

  ngOnInit(): void {
    this.choice = 1;
    this.agentservices.GetClientPolicies(+this.readSession('userID')).subscribe(res=>{
      res.forEach(cpolicy => {
        if(cpolicy.status == 1)
        {
          this.cpolicies.push(cpolicy);
          this.agentservices.GetPolicy(cpolicy.policyTermId).subscribe(resp=>{
            this.policies.push(resp);
          });
          this.agentservices.GetPolicyTerm(cpolicy.policyTermId).subscribe(policyterm=>{
            this.policyterms.push(policyterm);
          });
          this.agentservices.Clients(cpolicy.agentId).subscribe(clients=>{
            this.clients = clients;
          })
        }
      });
    })
  }

  ChangeChoice(ch : number)
  {
    this.choice = ch;
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }

  ReadTotalTurns(policytermId: number) : number
  {
    let policyterm = this.policyterms.find(p=>p.policyTermId == policytermId);
    return policyterm.terms;
  }

  ReadPolicyAmount(policytermId : number) : number
  {
    let policyterm = this.policyterms.find(pt=>pt.policyTermId == policytermId);
    let policy = this.policies.find(p=>p.policyId == policyterm.policyId);
    return policy.policyAmount;
  }

  ReadClientName(clientId : number) : string
  {
    let client = this.clients.find(c=>c.clientId == clientId);
    return client.clientName;
  }

  regClientDeath(clientpolicyId : number)
  {
    let clientdeath : Clientdeath;
    let currentDate : Date = new Date();
    let cp = this.cpolicies.find(cp=>cp.clientPolicyId == clientpolicyId);
    let pt = this.policyterms.find(p=>p.policyTermId == cp.policyTermId);
    let p = this.policies.find(p=>p.policyId == pt.policyId);
    clientdeath = {
      clientDeathId : 0,
      clientPolicyId : clientpolicyId,
      dod : currentDate.toString(),
      startDate : cp.startDate,
      claimAmount : ( p.policyAmount * 1.5)
    };
    if(window.confirm("You Are About to Mark ClientPolicy with ID: "+clientdeath.clientPolicyId+"as Deprecated(ClientDeath)\nAction cannot be Undone"))
    {
    this.agentservices.AddClientDeath(clientdeath);
    this.ngOnInit();
    }
    else{
      alert("Action Cancelled");
      this.ngOnInit();
    }
  }

  regMaturity(cp : Clientpolicy)
  {
    let currentDate = new Date();
    let pt = this.policyterms.find(p=>p.policyTermId == cp.policyTermId);
    let p = this.policies.find(p=>p.policyId == pt.policyId);
    let maturepolicy : Maturity ={
      maturityId : 0,
      clientPolicyId : cp.clientPolicyId,
      maturityDate : currentDate.toString(),
      claimAmount : p.policyAmount * 1.2,
      startDate : cp.startDate
    };
    if(window.confirm("You Are About to Mark ClientPolicy with ID: "+maturepolicy.clientPolicyId+"as Mature\nAction cannot be Undone"))
    {
    this.agentservices.AddMaturity(maturepolicy);
    this.ngOnInit();
    }
    else{
      alert("Action Cancelled");
      this.ngOnInit();
    }
  }

  regPenalty(cp : Clientpolicy)
  {
    let currentDate = new Date();
    let pt = this.policyterms.find(p=>p.policyTermId == cp.policyTermId);
    let p = this.policies.find(p=>p.policyId == pt.policyId);
    let premium : Premium = {
      premiumId : 0,
      clientPolicyId : cp.clientPolicyId,
      dateOfCollection : currentDate.toString(),
      penality : pt.premiumAmount * 2
    };
    if(window.confirm("You Are About to Impose ClientPolicy with ID: "+premium.clientPolicyId+"a penalty of"+premium.penality+"\nAction cannot be Undone"))
    {
    this.agentservices.AddPenalty(premium);
    this.ngOnInit();
    }
    else{
      alert("Action Cancelled");
      this.ngOnInit();
    }

  }
}
