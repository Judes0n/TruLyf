import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/User/user.service';
import { Client } from '../models/client';
import { Agent } from '../models/agent';
import { Company } from '../models/company';
import { StatusEnum } from '../enum/user-status-enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  readonly maxSize = 3 * 1024 * 1024;
  reguser: User;
  uploadFile: any;
  formOwner: string;
  regForm: FormGroup =  new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    repassword: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    type: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    dob: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    checkbox: new FormControl(null, Validators.required),
    upload: new FormControl(null, Validators.required)
  });;
  constructor(private userservice: UserService, private renderer: Renderer2) { }

  ngOnInit() {
    this.formOwner = '3';
    this.regForm.get('type').setValue(this.formOwner);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const retypePassword = form.get('repassword');
    return password && retypePassword && password.value === retypePassword.value ? null : { passwordMismatch: true };
  }
  FileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') && file.size < this.maxSize)
        this.uploadFile = file;
      // this.userservice.uploadFile(file);
      else {
        alert('Image Should be of Size Below 2KB \n of Format JPEG,JPG,PNG Format');
        this.regForm.get('upload').setValue('');
        this.uploadFile = null;
      }
    }
  }

  register() {
    let clientreq: Client;
    let agentreq: Agent;
    let companyreq: Company;
    this.reguser = {
      userId: 0,
      userName: this.regForm.get('username').value,
      password: this.regForm.get('password').value,
      type: +this.regForm.get('type').value,
      status: 0
    };
    switch (this.formOwner) {
      case "3": {
        clientreq = {
          clientId: 0,
          userID: 0,
          clientName: this.regForm.get('name').value,
          gender: this.regForm.get('gender').value,
          dob: this.regForm.get('dob').value,
          address: this.regForm.get('address').value,
          profilePic: "",
          phoneNum: this.regForm.get('phone').value,
          email: this.regForm.get('email').value,
          status: StatusEnum.Inactive
        };
        this.userservice.register(this.reguser, this.uploadFile,clientreq);
        break;
      }
      case "2": {
        agentreq = {
          agentId: 0,
          userId: 0,
          agentName: this.regForm.get('name').value,
          gender: this.regForm.get('gender').value,
          phoneNum: this.regForm.get('phone').value,
          dob: this.regForm.get('dob').value,
          email: this.regForm.get('email').value,
          address: this.regForm.get('address').value,
          grade: 1,
          profilePic: "",
          status: StatusEnum.Inactive
        };
        this.userservice.register(this.reguser, this.uploadFile,agentreq);
        break;
      }
      case "1": {
        companyreq = {
          companyId: 0,
          userId: 0,
          companyName: this.regForm.get('name').value,
          address: this.regForm.get('address').value,
          email: this.regForm.get('email').value,
          phoneNum: this.regForm.get('phone').value,
          profilePic: "",
          status: StatusEnum.Inactive
        };
        this.userservice.register(this.reguser, this.uploadFile,companyreq);
        break;
      }
    }
  }

  resetFormWhenTypeChanged(type: string) {
    if (type != this.regForm.get('type').value) {
      this.regForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        repassword: new FormControl(null, Validators.required),
        name: new FormControl(null),
        email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        type: new FormControl(type, Validators.required),
        gender: new FormControl(null, Validators.required),
        checkbox: new FormControl(null, Validators.required),
        upload: new FormControl(null, Validators.required)
      });
      this.formOwner = type;
      if (type == '1')
        this.regForm.get('gender').setValue('none');
    }
  }
}
