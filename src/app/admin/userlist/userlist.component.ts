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
  users: User[] = [];
  constructor(private adminservice: AdminService, private route: Router) { }

  ngOnInit() {
    if (this.readSession('userID') == null) {
      this.route.navigate(['/Denial']);
    }
    this.adminservice.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  ChangeUserStatus(user: User, status: StatusEnum) {
    this.adminservice.ChangeStatus(user, status).subscribe(res => {
        alert("Status Updation Success\nPlease Reload the List!");
    })
  }

  UserType(type: number): string {
    switch (type) {
      case 1:
        return "Company";
      case 2:
        return "Agent";
      case 3:
        return "Client";
      default:
        return "User";
    }

  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
}
