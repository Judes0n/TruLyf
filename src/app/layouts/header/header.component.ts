import { ChangeDetectorRef, Component,OnChanges,OnInit,SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnChanges{
  role : string;
  homeRoute: string;
  profileRoute: string;
  isLoggedIn : boolean;
  constructor(private router : Router,private changedec : ChangeDetectorRef){ }
  ngOnInit() {
    this.AuthUser();
  }
  ngOnChanges(changes : SimpleChanges)
  {
    this.AuthUser();
  }
  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
  AuthUser() : boolean
  {
    this.role = this.readSession('log_role');
    this.SetHomeRoute();
    if(this.role!=null)
      return false;
    return true;
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
  SetProfileRoute()
  {
    this.isLoggedIn = this.role === null ? false : true;
    switch (this.role) {
      case 'client': this.profileRoute = '/Client/Profile';
        break;
      case 'agent': this.profileRoute = '/Agent/Profile';
        break;
      case 'company': this.profileRoute = '/Company/Profile';
        break;
      case 'admin': this.profileRoute = '/Admin/Profile';
        break;
      default: this.profileRoute = '/Error'
    }
  }
  logout()
  {
      this.changedec.detectChanges()
      {
      sessionStorage.removeItem('log_role');
      sessionStorage.removeItem('userID');
      }
  }
}
