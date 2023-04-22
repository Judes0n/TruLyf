import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private acroute: ActivatedRoute, private clientservice: ClientService) { }

  ngOnInit(): void {
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

  ReadTypeName(typeId: number): String {
    return this.types.find(t => t.policytypeId == typeId).policytypeName;
  }

  ReadCompanyName(cid: number): String {
    return this.companies.find(c => c.companyId == cid).companyName;
  }
}
