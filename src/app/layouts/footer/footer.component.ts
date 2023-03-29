import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  role : string;
  homeRoute: string;
  isLoggedIn : boolean;
  userid : number;
  constructor(private router : Router){ }
  ngOnInit() {
    this.userid = +this.readSession('userID');
    this.AuthUser();
  }
  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
  AuthUser() : boolean
  {
    this.role = this.readSession('log_role');
    this.userid = +this.readSession('userID');
    this.SetHomeRoute();
    if(this.role!=null)
      return false;
    return true;
  }
  CheckUser() : string
  {
    this.role = this.readSession('log_role');
    switch(this.role)
    {
      case 'client': return 'client';

      case 'agent': return 'agent';

      case 'company': return 'company';

      case 'admin': return 'admin';

      default: return 'user'
    }
  }
  SetHomeRoute()
  {
    this.isLoggedIn = this.role === null ? false : true;
    switch (this.role) {
      case 'client': this.homeRoute = '/Home/Client';
        break;
      case 'agent': this.homeRoute = '/Home/Agent';
        break;
      case 'company': this.homeRoute = '/Home/Company';
        break;
      case 'admin': this.homeRoute = '/Home/Admin';
        break;
      default: this.homeRoute = '/Home'
    }
  }
  logout()
  {
      sessionStorage.removeItem('log_role');
      sessionStorage.removeItem('userID');
  }
}
