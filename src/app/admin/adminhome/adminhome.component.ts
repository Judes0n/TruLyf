import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { UserService } from 'src/app/services/User/user.service';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {
  users : User[] = [];
  adminname : string;
  constructor(private userservice : UserService,private route : Router) { }

  ngOnInit()
  {
    if (this.readSession('userID') == null) {
      this.route.navigate(['/Denial']);
    }
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res=>{
      console.log(res);
      this.adminname = res.userName;
    });
  }
  GetName()
  {

  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
}
