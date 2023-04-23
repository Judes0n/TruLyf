import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agentcompany } from 'src/app/models/agentcompany';
import { Company } from 'src/app/models/company';
import { Policy } from 'src/app/models/policy';
import { Policytype } from 'src/app/models/policytype';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  policyId: number;
  policy: Policy;
  types: Policytype[];
  companies: Company[];
  showOverlay: boolean = false;
  val: boolean = false;
  referral: string;

  constructor(private acroute: ActivatedRoute, private clientservice: ClientService) { }

  ngOnInit(): void {
    this.showOverlay = false;
    this.val = false;
    this.types = this.companies = [];
    this.policyId = +this.acroute.snapshot.paramMap.get('policyId');
    this.clientservice.GetPolicy(this.policyId).subscribe(
      res => {
        this.policy = res;
      }
    );
    this.clientservice.GetType().subscribe(res => {
      this.types = res;
    });
    this.clientservice.GetCompanies().subscribe(res => {
      this.companies = res;
    });
  }

  ValidateReferral(referral: string) {
    var result: Agentcompany;
    this.clientservice.ValidateRef(referral).subscribe(res => {
      result = res;
      if (res != null) {
        if (res.id == 0)
          this.val = true;
        else
          this.val = false;
      }
    });
  }

  ReadTypeName(typeId: number): String {
    let a = this.types.find(t => t.policytypeId == typeId);
    if (a != null) return a.policytypeName; else return "";
  }

  ReadCompanyName(cid: number): String {
    let a = this.companies.find(c => c.companyId == cid);
    if (a != null) return a.companyName; else return "";
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
  check(val : boolean)
  {
    return val;
  }
}
