import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
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
