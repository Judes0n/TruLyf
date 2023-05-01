import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Company } from 'src/app/models/company';
import { Nominee } from 'src/app/models/nominee';
import { Policy } from 'src/app/models/policy';
import { Policyterm } from 'src/app/models/policyterm';
import { Policytype } from 'src/app/models/policytype';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  clientId: number;
  policyId: number;
  policy: Policy;
  types: Policytype[];
  companies: Company[];
  nominees: Nominee[];
  pterms: Policyterm[];
  showOverlay: boolean = false;
  showVerify : boolean = false;
  con: boolean;
  agentId: number;
  referral: string;
  cpform: FormGroup;

  constructor(private acroute: ActivatedRoute, private clientservice: ClientService, private datePipe: DatePipe, private route : Router) { }

  ngOnInit(): void {
    if (this.readSession('clientId') == null) {
      this.route.navigate(['/Denial']);
    }
    this.showOverlay = false;
    this.con = false;
    this.types = this.companies = [];
    this.cpform = new FormGroup({
      pterm: new FormControl(null, Validators.required),
      nominee: new FormControl(null, Validators.required),
      startdate: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required),
      expdate: new FormControl(null, Validators.required),
      counter: new FormControl(null, Validators.required)
    });
    this.policyId = +this.acroute.snapshot.paramMap.get('policyId');
    this.clientservice.GetPolicy(this.policyId).subscribe(
      res => {
        this.policy = res;
        this.clientservice.GetTerms(res.policyId).subscribe(resp => {
          this.pterms = resp;
        });
      }
    );
    this.clientservice.GetType().subscribe(res => {
      this.types = res;
    });
    this.clientservice.GetCompanies().subscribe(res => {
      this.companies = res;
    });

    this.clientservice.GetClientById(+this.readSession('userID')).subscribe(res => {
      this.clientId = res.clientId;
      this.clientservice.ViewNominees(res.clientId).subscribe(resp => {
        this.nominees = resp;
      });
    });
  }

  ValidateReferral(referral: string) {
    this.clientservice.ValidateRef(referral).subscribe(res => {
      if (res != null) {
        if (res.id == 0) {
          alert("Invalid Referral Code!!");
        }
        else {
          if (res.companyId == this.policy.companyId) {

            alert("Referral Verified!!");
            this.referral = res.referral;
            this.agentId = res.agentId;
            this.con = true;
            this.showOverlay = true;
          }
        }
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

  toggleVerify() {
    this.showVerify = !this.showVerify;
  }

  check(val: boolean): boolean {
    return val;
  }

  set() {
    const expdate = new Date(this.cpform.get('startdate').value);
    var _p = this.pterms.find(p => p.policyTermId == this.cpform.get('pterm').value);
    var date = new Date(expdate.setMonth(expdate.getMonth() + _p.period));
    this.cpform.get('expdate').setValue(this.datePipe.transform(date, 'yyyy-MM-dd'));
    this.cpform.get('counter').setValue(_p.terms);
  }
  submit() {
    let cpolicy: Clientpolicy;
    cpolicy = {
      clientPolicyId: 0,
      clientId: this.clientId,
      policyTermId: this.cpform.get('pterm').value,
      nomineeId: this.cpform.get('nominee').value,
      startDate: this.cpform.get('startdate').value,
      expDate: this.cpform.get('expdate').value,
      counter: this.cpform.get('counter').value,
      status: 0,
      referral: this.referral,
      agentId: this.agentId
    };

    this.clientservice.AddClientPolicy(cpolicy).subscribe((res) => {
      if (res.policyTermId != 0)
        alert("Client Policy Added!");
      else alert("Client Policy Already Exists")
    },
      (error) => {
        console.log("Error =>  " + JSON.stringify(error));
      });
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

}
