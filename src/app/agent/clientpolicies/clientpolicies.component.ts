import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { Client } from 'src/app/models/client';
import { Clientpolicy } from 'src/app/models/clientpolicy';
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
  i : number;
  constructor(private agentservice: AgentService, private clientservice: ClientService) { }
  ngOnInit(): void {
    this.cpolicies = null;
    this.i = 1;
    this.agentservice.GetAgentId(+this.readSession('userID')).subscribe((res)=>{
      this.agentservice.GetClientPolicies(res.agentId).subscribe(resp=>{
        this.cpolicies = resp;
      });
    });
  }

  findClientName(clientId: number) {
    let client: Client;
    this.clientservice.GetClient(clientId).subscribe(res => {
      client = res;
    });
    this.i++;
    return client.clientName;
  }

  findpremium(policytermId : number) : number
  {
   return this.agentservice.premiumAmount(policytermId);
  }

  findPolicyName(policytermId : number) : string
  {
   return this.agentservice.PolicyName(policytermId);
  }

  findPolicyAmount(policytermId : number) : number
  {
    return this.agentservice.premiumAmount(policytermId);
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }

}
