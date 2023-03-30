import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/feedback';
import { Maturity } from 'src/app/models/maturity';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class AdminViewComponent implements OnInit {
  choice : number;
  policies : Policy[] = [];
  pterms : Policyterm[] = [];
  maturities : Maturity[] = [];
  feeds : Feedback[] = [];
  constructor(private adminservice : AdminService){}

  ngOnInit()
  {
    this.choice = 1;
    this.adminservice.ViewAllPolicies().subscribe({
      next : (policies)=>{
       this.policies = policies;
       console.log(policies);
      },
      error : (response)=>{
        console.log(response);
      }
    });

    this.adminservice.ViewAllMaturities().subscribe({
      next : (maturities)=>{
       this.maturities = maturities;
       console.log(maturities);
      },
      error : (response)=>{
        console.log(response);
      }
    });

    this.adminservice.ViewFeedbacks().subscribe({
      next : (feedback)=>{
       this.feeds = feedback;
       console.log(feedback);
      },
      error : (response)=>{
        console.log(response);
      }
    });
  }

  showpterms(policyId : number) : any
  {
    return this.adminservice.ViewPolicyterm(policyId).subscribe(res=>{
      this.pterms = res;
    });
  }

  Approve(policyId : number)
  {
    this.adminservice.ApprovePolicy(policyId);
  }

  Reject(policyId : number)
  {
    this.adminservice.BlockPolicy(policyId);
  }

  selectChoice(choice :number){
    this.choice = choice;
  }
}
