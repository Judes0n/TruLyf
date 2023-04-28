import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Agentcompany } from 'src/app/models/agentcompany';
import { Client } from 'src/app/models/client';
import { Company } from 'src/app/models/company';
import { Policy } from 'src/app/models/policy';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { UserService } from 'src/app/services/User/user.service';

export class Imageset {
  imagePath: string;
  image: SafeUrl;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class AgentViewComponent implements OnInit {
  choice: number;
  clients: Client[] = [];
  companies: Company[] = [];
  policies: Policy[] = [];
  private allpolicies: Policy[] = [];
  agentId: number;
  imageset: Imageset[];
  loaded: boolean;

  constructor(private agentservies: AgentService, private userservice: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loaded = false;
    this.choice = 1;
    this.companies = [];
    this.policies = [];
    this.imageset = [];
    this.agentservies.GetAgentId(+this.readSession('userID')).subscribe(response => {
      this.agentId = response.agentId;
      this.agentservies.Companies(response.agentId).subscribe(res => {
        res.forEach(async company => {
          let a = new Imageset();
          if (company.status == 1 && (this.companies.find(com => com.companyId == company.companyId) == null)) {
            this.companies.push(company);
            a.imagePath = company.profilePic;
            a.image = await this.Getimage(company.profilePic);
            this.imageset.push(a);
          }
        });
      });
      //clients[] init
      this.agentservies.Clients(response.agentId).subscribe(resp => {
        let a = new Imageset();
        resp.forEach(async c => {
          if (this.clients.find(cl => cl.clientId == c.clientId) == null) {
            this.clients.push(c);
            a.imagePath = c.profilePic;
            a.image = await this.Getimage(c.profilePic);
            this.imageset.push(a);
          }
        });
      });
    });
    console.log(this.imageset);
    this.loaded = true;
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  ChangeChoice(ch: number) {
    this.choice = ch;
  }

  updatePolicies(cid: number) {
    this.policies = [];
    this.agentservies.ViewPolicies(cid).subscribe((res) => {
      this.allpolicies = res;
      this.allpolicies.forEach(policy => {
        if (policy.status == 1) {
          this.policies.push(policy);
        }
      });
    });
  }
  GetReferral(companyId: number) {
    this.agentservies.GetRefs(this.agentId, companyId).subscribe((res: Agentcompany) => {
      navigator.clipboard.writeText(res.referral).then(() => { alert(`Successfully copied Referral code to clipboard`); }).catch((error) => {
        console.error(`Failed to copy ${res.referral} to clipboard: ${error}`);
      });
    });
  }

 async Getimage(path: string): Promise<SafeUrl> {
    let sanURL: SafeUrl;
    let img = await this.userservice.GetImage(path).toPromise();
    sanURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img));
    return sanURL;
  }

  check(path: string) : SafeUrl {
    var res = this.imageset.find(i=>i.imagePath == path);
    if(res != null)
    return res.image;
    else return "";
  }
}
