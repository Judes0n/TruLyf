import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  reactiveForm: FormGroup;
  radioValue: string = 'Client';
  // radioButtonGroup : FormGroup;
  /**
   *
   */
  constructor(private router: Router) {}
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  Signin() {
    if (this.radioValue == 'Client') {
      if (
        this.reactiveForm.get('userName').value == 'client' &&
        this.reactiveForm.get('password').value == '12345'
      ) {
        sessionStorage.setItem('log_role', 'client');
        this.router.navigate(['/Home/Client']);
      } else console.log('Invalid Credentials');
    } else if (this.radioValue == 'Agent') {
      if (
        this.reactiveForm.get('userName').value == 'agent' &&
        this.reactiveForm.get('password').value == '12345'
      ) {
        sessionStorage.setItem('log_role', 'agent');
        this.router.navigate(['/Home/Agent']);
      } else console.log('Invalid Credentials');
    } else if (this.radioValue == 'Company') {
      if (
        this.reactiveForm.get('userName').value == 'company' &&
        this.reactiveForm.get('password').value == '12345'
      ) {
        sessionStorage.setItem('log_role', 'company');
        this.router.navigate(['/Home/Company']);
      } else console.log('Invalid Credentials');
    } else console.log('Invalid Credentials');
  }
  radioValueChange(value: string) {
    this.radioValue = value;
    if (value == 'Agent') {
      document.getElementById('imgField').style.background =
        'linear-gradient(160deg, #f12711, #f5af19)';
    } else if (value == 'Company') {
      document.getElementById('imgField').style.background =
        'linear-gradient(130deg, #ed213a, #93291e)';
    } else {
      document.getElementById('imgField').style.background =
        'linear-gradient(160deg, #0093e9 0%, #80d0c7 100%)';
    }
  }
}
