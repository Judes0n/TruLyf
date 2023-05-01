import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { Company } from 'src/app/models/company';
import { Feedback } from 'src/app/models/feedback';
import { Maturity } from 'src/app/models/maturity';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { Policytype } from 'src/app/models/policytype';
import { AdminService } from 'src/app/services/Admin/admin.service';

class Policieswithterm implements Policy {
  companyId: number;
  policytypeId: number;
  policyName: string;
  timePeriod: number;
  policyAmount: number;
  status: StatusEnum;
  policyId: number;
  pterm: Policyterm[];
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class AdminViewComponent implements OnInit {

  refreshEvent = new EventEmitter<void>();
  choice: number;
  policies: Policieswithterm[] = [];
  pterms: Policyterm[] = [];
  maturities: Maturity[] = [];
  feeds: Feedback[] = [];



  constructor(private adminservice: AdminService,private acroute : ActivatedRoute,private route : Router) { }

  ngOnInit() {
    if (this.readSession('userID') == null) {
      this.route.navigate(['/Denial']);
    }
    this.choice = +this.acroute.snapshot.paramMap.get('choice');
    this.policies = [];
    this.adminservice.ViewAllPolicies().subscribe(
      (policies) => {
        policies.forEach(policy => {
          this.adminservice.ViewPolicyterm(policy.policyId).subscribe(res => {
            this.policies.push({
              companyId: policy.companyId,
              policytypeId: policy.policytypeId,
              policyName: policy.policyName,
              timePeriod: policy.timePeriod,
              policyAmount: policy.policyAmount,
              status: policy.status,
              policyId: policy.policyId,
              pterm : res
               });
          });
          });
      },
      (error) => {
        console.log(error);
      }
    );

    this.adminservice.ViewAllMaturities().subscribe(
      (maturities) => {
        this.maturities = maturities;
      },
      (error) => {
        console.log(error);
      }
    );

    this.adminservice.ViewFeedbacks().subscribe(
      (feedback) => {
        this.feeds = feedback;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showpterms(policyId: number): Policyterm[] {
    let ptlist : Policyterm[];
     this.adminservice.ViewPolicyterm(policyId).subscribe(res => {
      ptlist= res;
    });
    return ptlist;
  }



  updateTerms(pid : number)
  {
    this.adminservice.ViewPolicyterm(pid).subscribe(res => {
      this.pterms = res;
    });
  }

  Approve(policyId: number) {
    this.adminservice.ApprovePolicy(policyId);
  }

  Reject(policyId: number) {
    this.adminservice.BlockPolicy(policyId);
  }

  selectChoice(choice: number) {
    this.choice = choice;
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
}
