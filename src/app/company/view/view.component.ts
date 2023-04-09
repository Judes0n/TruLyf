import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { Agentcompany } from 'src/app/models/agentcompany';
import { Policy } from 'src/app/models/policy';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { CompanyService } from 'src/app/services/Company/company.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class CompanyViewComponent implements OnInit {
  choice : number;
  agents : Agentcompany[] = [];
  policies : Policy[] = [];
  compId : number;
  constructor(private adminservice : AdminService,private companyservice : CompanyService) {}
  ngOnInit()
  {
    this.choice=1;
    this.companyservice.GetCompany(+this.readSession('userID')).subscribe(resp=>
      {
        this.adminservice.ViewAllPolicies().subscribe(res=>{
          if(res.find(a=>a.companyId == resp.companyId))
          {
            this.policies = res;
          }
        });

      });
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }


  ChangeChoice(ch : number)
  {
    this.choice = ch;
  }
}
