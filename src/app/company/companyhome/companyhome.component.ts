import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-companyhome',
  templateUrl: './companyhome.component.html',
  styleUrls: ['./companyhome.component.scss']
})
export class CompanyhomeComponent implements OnInit {
  companyName : string;

  constructor(private userservice : UserService){}

  ngOnInit()
  {
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res=>{
      console.log(res);
      this.companyName = res.userName;
    });
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }

}
