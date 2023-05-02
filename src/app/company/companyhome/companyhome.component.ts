import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-companyhome',
  templateUrl: './companyhome.component.html',
  styleUrls: ['./companyhome.component.scss']
})
export class CompanyhomeComponent implements OnInit {
  companyName: string;

  constructor(private userservice: UserService, private companyservice: CompanyService, private route: Router) { }

  ngOnInit() {
    if (this.readSession('userID') == null) {
      this.route.navigate(['/Denial']);
    }
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res => {
    });
    this.companyservice.GetCompany(+this.readSession('userID')).subscribe(resp => { sessionStorage.setItem("companyId", resp.companyId.toString()); this.companyName = resp.companyName; });
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

}
