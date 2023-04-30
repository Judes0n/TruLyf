import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/Company/company.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-companyhome',
  templateUrl: './companyhome.component.html',
  styleUrls: ['./companyhome.component.scss']
})
export class CompanyhomeComponent implements OnInit {
  companyName : string;

  constructor(private userservice : UserService,private companyservice : CompanyService){}

  ngOnInit()
  {
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res=>{
      console.log(res);
      this.companyName = res.userName;
    });
    this.companyservice.GetCompany(+this.readSession('userID')).subscribe(resp=>sessionStorage.setItem("companyId",resp.companyId.toString()));
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }

}
