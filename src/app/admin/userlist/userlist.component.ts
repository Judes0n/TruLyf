import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'src/app/enum/user-type-enum';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  users : User[] = [];
  constructor(private adminservice : AdminService,private router : Router) { }

  ngOnInit()
  {
    this.adminservice.getAllUsers().subscribe({
      next : (users)=>{
       this.users = users;
       console.log(users);
      },
      error : (response)=>{
        console.log(response);
      }
    });
  }

  Approve(user : User) : StatusEnum
  {

    this.adminservice.Approve(user).subscribe(res=>{
      alert('User Approved');
      this.ngOnInit();
      return res;
    });

    this.ngOnInit();
    return user.status;
  }
  Block(userId : number)
  {
    this.adminservice.Block(userId);
    alert('User Blocked');
    this.ngOnInit();
  }

  UserType(type : number) : string
  {
    switch(type)
    {
      case 1 :
        return "Company";
      case 2:
        return "Agent";
      case 3:
        return "Client";
      default:
        return "User";
    }

  }
}
