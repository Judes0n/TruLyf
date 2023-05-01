import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ClientService } from 'src/app/services/Client/client.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.scss'],
})
export class ClienthomeComponent implements OnInit {
  clientName: string;
  constructor(private userservice: UserService, private clientservice: ClientService , private route : Router ) { }
  ngOnInit(): void {
    if (this.readSession('userID') == null) {
      this.route.navigate(['/Denial']);
    }
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res => {
      this.clientName = res.userName;
    });
    this.clientservice.GetClientById(+this.readSession('userID')).subscribe(resp => sessionStorage.setItem("clientId", resp.clientId.toString()));
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }
}
