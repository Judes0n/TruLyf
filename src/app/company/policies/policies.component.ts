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
  policyForm: FormGroup;
  policytermForm: FormGroup;
  choice: number;
  period: number;
  ptypes: Policytype[] = [];
  newpolicy: Policy;
  newpolicyterm: Policyterm;
  policies: Policy[] = [];
  premiumAmount: number;
  fullperiod: number;
  terms: number[];

  constructor(private adminservice: AdminService, private companyservice: CompanyService) { }

  ngOnInit(): void {
    this.policyForm = new FormGroup({
      companyId: new FormControl(null),
      policyTypeId: new FormControl(null, Validators.required),
      policyName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      timePeriod: new FormControl(null, Validators.required),
      policyAmount: new FormControl(null, Validators.required)
    });
    this.terms = [];
    this.policytermForm = new FormGroup({
      policyId: new FormControl(null, Validators.required),
      Terms: new FormControl(null, Validators.required),
      premiumAmount: new FormControl(this.premiumAmount)
    });
    this.choice = 1;
    this.adminservice.ViewAllTypes().subscribe(res => {
      this.ptypes = res;
    });

    this.adminservice.ViewAllPolicies().subscribe(res => {
      res.forEach(p=>{
        if(p.status != 2)
        {
          this.policies.push(p);
        }
      });
    })
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  sub() {
    this.newpolicy = {
      policyId: 0,
      companyId: 10,
      policytypeId: +this.policyForm.get('policyTypeId').value,
      policyName: this.policyForm.get('policyName').value,
      timePeriod: +this.policyForm.get('timePeriod').value,
      policyAmount: +this.policyForm.get('policyAmount').value,
      status: StatusEnum.Inactive
    };
    this.companyservice.GetCompany(+this.readSession('userID')).subscribe(res => {
      this.newpolicy.companyId = res.companyId;
      this.companyservice.AddPolicy(this.newpolicy);
      console.log(this.newpolicy);
      this.choice = 2;
    });
    this.ngOnInit();
  }

  subTerms() {
    let dbpolicy: Policy;
    this.companyservice.GetPolicy(this.policytermForm.get('policyId').value).subscribe(res => {
      dbpolicy = res;
      this.newpolicyterm = {
        policyTermId: 0,
        policyId: this.policytermForm.get('policyId').value,
        terms: this.policytermForm.get('Terms').value,
        premiumAmount: this.policytermForm.get('premiumAmount').value,
        period: dbpolicy.timePeriod
      }
      this.companyservice.AddPolicyTerm(this.newpolicyterm);
    });

  }
  _autofill(policyId: number) {
    let dbpolicy: Policy;
    this.companyservice.GetPolicy(policyId).subscribe(res => {
      dbpolicy = res;
      this.terms= [];
      for (let i: number = 1; i <= dbpolicy.timePeriod; i++) {
        this.terms.push(i);
      }
    });

  }
  autofill(policyId: number, terms: number) {
    let dbpolicy: Policy;
    this.companyservice.GetPolicy(policyId).subscribe(res => {
      dbpolicy = res;
      this.premiumAmount = Math.round(dbpolicy.policyAmount / terms);
      this.policytermForm.get('premiumAmount').setValue(this.premiumAmount);
    });

  }

  Changetab(ch: number) {
    this.choice = ch;
  }
}
