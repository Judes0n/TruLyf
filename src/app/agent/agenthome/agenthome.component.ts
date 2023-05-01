import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { CompanyService } from 'src/app/services/Company/company.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-agenthome',
  templateUrl: './agenthome.component.html',
  styleUrls: ['./agenthome.component.scss']
})
export class AgenthomeComponent implements OnInit {
  agentName: string;
  companies: Company[] = [];
  constructor(private userservice: UserService, private companyservice: CompanyService, private agentservice: AgentService, private route : Router) { }
  ngOnInit(): void {
    if (this.readSession('userID') == null) {
      this.route.navigate(['/Denial']);
    }
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res => {
      console.log(res);
      this.agentName = res.userName;
      this.agentservice.GetAgentId(res.userId).subscribe(resp=>{
        sessionStorage.setItem('agentId',resp.agentId.toString());
      });
    });

    this.companyservice.GetAllCompany().subscribe(res => {
      this.companies = res;
    });
  }
  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  Apply(companyId: number) {
    this.agentservice.GetAgentId(+this.readSession('userID')).subscribe(res => {
      this.companyservice.Apply(companyId, res.agentId);
    })

  }
}
