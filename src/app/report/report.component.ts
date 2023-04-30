import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/Report/report.service';
import { Policy } from '../models/policy';
import { User } from '../models/user';
import { Client } from '../models/client';
import { Agent } from '../models/agent';
import { Company } from '../models/company';
import { Maturity } from '../models/maturity';
import { Clientdeath } from '../models/clientdeath';
import { Feedback } from '../models/feedback';
import { Clientpolicy } from '../models/clientpolicy';
import { Payments } from '../models/payment';
import { UserTypeEnum } from '../enum/user-type-enum';
import { Policytype } from '../models/policytype';
import { ClientService } from '../services/Client/client.service';
import { Policyterm } from '../models/policyterm';
import { AgentService } from '../services/Agent/agent.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  usertype: string;
  choice: number;
  policies: Policy[];
  users: User[];
  actors: Client[] | Agent[] | Company[];
  maturities: Maturity[];
  clientdeaths: Clientdeath[];
  feedbacks: Feedback[];
  clientpolicies: Clientpolicy[];
  payments: Payments[];
  ptypes: Policytype[];
  isNavbarOpen: boolean;
  clients: Client[];
  agents: Agent[];
  companies: Company[];
  policyterm: Policyterm;
  a: Policy;
  constructor(private reportservice: ReportService, private clientservices: ClientService, private agentservice: AgentService) { }

  ngOnInit() {
    this.isNavbarOpen = false
    this.usertype = this.readSession('log_role');
    this.choice = 1;
    this.policies = [];
    this.users = [];
    this.actors = [];
    this.maturities = [];
    this.clientdeaths = [];
    this.feedbacks = [];
    this.clientpolicies = [];
    this.payments = [];
    this.ptypes = [];
    this.policyterm = null;
    this.a = null;

    this.clientservices.GetType().subscribe(res => {
      this.ptypes = res;
    });
    switch (this.usertype) {
      case "admin": {
        this.reportservice.Admin_Get_Policies().subscribe(p => this.policies = p);
        this.reportservice.Admin_Get_Users().subscribe(a => this.users = a);
        this.reportservice.Admin_Get_Maturities().subscribe(m => this.maturities = m);
        this.reportservice.Admin_Get_ClientDeaths().subscribe(cd => this.clientdeaths = cd);
        this.reportservice.Admin_Get_Feedbacks().subscribe(f => this.feedbacks = f);
        break;
      }
      case "company": {
        this.reportservice.Company_Get_Agents(+this.readSession('companyId')).subscribe(a => this.agents = a);
        this.reportservice.Company_Get_ClientPolicies(+this.readSession('companyId')).subscribe(c => this.clientpolicies = c);
        this.reportservice.Company_Get_Policies(+this.readSession('companyId')).subscribe(p => this.policies = p);
        break;
      }
      case "agent": {
        this.reportservice.Agent_Get_ClientPolicies(+this.readSession('agentId')).subscribe(c => this.clientpolicies = c);
        this.reportservice.Agent_Get_Payments(+this.readSession('agentId')).subscribe(p => this.payments = p);
        break;
      }
      case "client": {
        this.reportservice.Client_Get_Payments(+this.readSession('clientId')).subscribe(p => this.payments = p);
        break;
      }
    }
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  ChangeChoice(choice: number) {
    this.choice = choice;
  }

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  ReadType(typeId: number): string {
    return this.ptypes.find(p => p.policytypeId == typeId).policytypeName;
  }

  actorselect(type: UserTypeEnum) {
    this.actors = [];
    this.clients = [];
    this.companies = [];
    this.agents = [];
    this.reportservice.Admin_Get_Actors(type).subscribe(res => {
      if (typeof res === typeof this.clients) { this.actors.forEach(a => this.clients.push(a)); }
      else if (typeof res === typeof this.agents) { this.actors.forEach(a => this.agents.push(a)); }
      else if (typeof res === typeof this.companies) { this.actors.forEach(a => this.companies.push(a)); }
    });
  }
}

