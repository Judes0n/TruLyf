import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  role : string;
  constructor(private router : Router)
  {

  }
  ngOnInit()
  {
    this.role = this.readSession('log_role');
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
  logout()
  {
    sessionStorage.removeItem('log_role');
    this.router.navigate(['\Home']);
  }
}
