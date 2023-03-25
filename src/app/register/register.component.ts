import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  readonly maxSize = 3 * 1024 * 1024;
  reguser : User;
  uploadFile : any;
  regForm : FormGroup;
  constructor(private userservice : UserService , private renderer: Renderer2){}
  ngOnInit()
  {
    this.regForm = new FormGroup({
      username : new FormControl(null,Validators.required),
      password : new FormControl(null,Validators.required),
      repassword : new FormControl(null,Validators.required),
      name     : new FormControl(null),
      email    : new FormControl(null,Validators.required),
      type     : new FormControl(null,Validators.required),
      checkbox : new FormControl(null,Validators.required),
      upload   : new FormControl(null,Validators.required)
    })
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const retypePassword = form.get('repassword');
    return password && retypePassword && password.value === retypePassword.value ? null : { passwordMismatch: true };
  }
  FileChange(event : any)
  {
    if(event.target.files.length > 0)
    {
      const file = event.target.files[0];
      if((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg')&& file.size < this.maxSize)
        this.uploadFile = file;
      // this.userservice.uploadFile(file);
      else
      {
        alert('Image Should be of Size Below 2KB \n of Format JPEG,JPG,PNG Format');
        this.regForm.get('upload').setValue('');
        this.uploadFile = null;
      }
    }
  }

  register()
  {
    var type = this.regForm.get('type').value;
    this.reguser = {
      userId : 0,
      userName : this.regForm.get('username').value,
      password : this.regForm.get('password').value,
      type     : this.regForm.get('type').value,
      status   : 0
    };
    this.userservice.register(this.reguser,this.uploadFile);
  }
}
