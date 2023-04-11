import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-agenthome',
  templateUrl: './agenthome.component.html',
  styleUrls: ['./agenthome.component.scss']
})
export class AgenthomeComponent implements OnInit {
agentName : string;
constructor(private userservice : UserService){}
  ngOnInit(): void {
    this.userservice.GetUser(+this.readSession('userID')).subscribe(res=>{
      console.log(res);
      this.agentName = res.userName;
    });
  }
  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
}
