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
  isLoggedIn : boolean;
  userid : number;
  constructor(private router : Router,private changedec : ChangeDetectorRef){ }
  ngOnInit() {
    this.userid = +this.readSession('userID');
    this.AuthUser();
  }
  ngOnChanges(changes : SimpleChanges)
  {
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
      this.changedec.detectChanges()
      {
      sessionStorage.removeItem('log_role');
      sessionStorage.removeItem('userID');
      }
  }
}
