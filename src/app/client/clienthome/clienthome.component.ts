import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/Client/client.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.scss'],
})
export class ClienthomeComponent implements OnInit {
  clientName: string;
  constructor(private userservice : UserService,private clientservice: ClientService) { }
  ngOnInit(): void {
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res => {
      this.clientName = res.userName;
    });
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }
}
