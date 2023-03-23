import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusEnum } from '../enum/user-status-enum';
import { UserTypeEnum } from '../enum/user-type-enum';
import { User } from '../models/user';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  reactiveForm: FormGroup;
  formuser : User;
  constructor(private router: Router ,private userservice : UserService){}
  ngOnInit()
  {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  Login()
  {
    this.formuser = {
      userId : 0,
      userName : this.reactiveForm.get('userName').value,
      password : this.reactiveForm.get('password').value,
      type : UserTypeEnum.Client,
      status : StatusEnum.Inactive
    };
    switch(this.userservice.login(this.formuser).subscribe())
    {

    }
    // if (this.radioValue == 'Client') {
    //   if ( == 'client' && == '12345')
    //     {
    //     sessionStorage.setItem('log_role', 'client');
    //     this.router.navigate(['/Home/Client']);
    //     }
    //   else
    //     console.log('Invalid Credentials');
    //   }
    //   else if (this.radioValue == 'Agent') {
    //   if (this.reactiveForm.get('userName').value == 'agent' && this.reactiveForm.get('password').value == '12345')
    //     {
    //     sessionStorage.setItem('log_role', 'agent');
    //     this.router.navigate(['/Home/Agent']);
    //     }
    //   else
    //      console.log('Invalid Credentials');
    //     }
    //   else if (this.radioValue == 'Company') {
    //     if (this.reactiveForm.get('userName').value == 'company' && this.reactiveForm.get('password').value == '12345') {
    //       sessionStorage.setItem('log_role', 'company');
    //       this.router.navigate(['/Home/Company']);
    //       }
    //     else console.log('Invalid Credentials');
    //   } else
    //   console.log('Invalid Credentials');
     }
}
