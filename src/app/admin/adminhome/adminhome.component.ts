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

  constructor(private adminservice : AdminService) { }

  ngOnInit()
  {
    this.adminservice.getAllUsers()
    .subscribe({
      next : (users)=>{
       this.users = users;
       console.log(users);
      },
      error : (response)=>{
        console.log(response);
      }
    })
  }
}
