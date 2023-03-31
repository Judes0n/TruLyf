import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { Company } from 'src/app/models/company';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { Policytype } from 'src/app/models/policytype';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { CompanyService } from 'src/app/services/Company/company.service';
import { UserService } from 'src/app/services/User/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policyForm : FormGroup;
  policytermForm : FormGroup;
  choice : number;
  ptypes : Policytype[] = [];
  policy : Policy;
  policies : Policy[] = [];
  premiumAmount : number;
  fullperiod : number;
  constructor(private adminservice : AdminService,private companyservice : CompanyService){}

  ngOnInit(): void {
    this.policyForm = new FormGroup({
      companyId : new FormControl(null,Validators.required),
      policyTypeId : new FormControl(null,Validators.required),
      policyName : new FormControl(null,[Validators.required,Validators.minLength(4)]),
      timePeriod : new FormControl(null,Validators.required),
      policyAmount : new FormControl(null,Validators.required)
    });

    this.policytermForm = new FormGroup({
      policyId : new FormControl(null,Validators.required),
      Terms    : new FormControl(null,Validators.required),
      premiumAmount : new FormControl(this.premiumAmount)
    });
    this.choice=1;
    this.adminservice.ViewAllTypes().subscribe(res=>{
      this.ptypes = res;
    });

    this.adminservice.ViewAllPolicies().subscribe(res=>{
      this.policies = res;
    })
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }

  sub()
  {
    let company : Company;
    this.companyservice.GetCompany(+this.readSession('userId')).subscribe(res=>{
      company = res;
    });
    this.policy = {
      policyId : -1,
      companyId : company.companyId,
      policytypeId : +this.policyForm.get('policyTypeId').value,
      policyName : this.policyForm.get('policyName').value,
      timePeriod : +this.policyForm.get('timePeriod').value,
      policyAmount : +this.policyForm.get('policyAmount').value,
      status : StatusEnum.Inactive
    };
    this.companyservice.AddPolicy(this.policy);
  }

  Changetab(ch : number)
  {
    this.choice = ch;
  }
}
