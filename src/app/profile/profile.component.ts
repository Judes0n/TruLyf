import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { ClientService } from 'src/app/services/Client/client.service';
import { CompanyService } from 'src/app/services/Company/company.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userid: number;
  usertype: string;
  isEditable: boolean;
  profileuser: User;
  profileForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmpassword: new FormControl(null, Validators.required)
  });

  constructor(private route: ActivatedRoute, private userservice: UserService, private companyservice: CompanyService, private agentservice: AgentService, private clientservice: ClientService) { }

  ngOnInit() {
    this.isEditable = false;
    this.route.params.subscribe(params => {
      this.userid = params['userid'];
    });
    this.usertype = this.readSession('log_role');
    this.userservice.GetUser(this.userid).subscribe(u => {
      this.profileuser = u;
      this.setForm(u);
    });
  }

  setForm(user: User) {
    this.profileForm.get('username').setValue(user.userName);
    this.profileForm.get('password').setValue(user.password);
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  Toggle() {
    this.isEditable = !this.isEditable;
  }

  subProfile() {
    let user: User = {
      userId: this.profileuser.userId,
      userName: this.profileForm.get('username').value,
      password: this.profileForm.get('password').value,
      status: this.profileuser.status,
      type: this.profileuser.type
    };
    if (this.profileForm.get('confirmpassword').value == this.profileForm.get('password').value)
      this.userservice.UpdateUser(user).subscribe(res => {
        if (res.userId != 0) {
          alert("Profile Updated!!");
          this.ngOnInit();
        }
        else alert("Profile Updation Failed!!");
      });

  }
}
