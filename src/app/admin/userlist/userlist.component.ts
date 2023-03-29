import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { Router } from '@angular/router';
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

  Approve(userId : number)
  {
    this.adminservice.Approve(userId);
  }
  Block(userId : number)
  {
    this.adminservice.Block(userId);
  }
}
