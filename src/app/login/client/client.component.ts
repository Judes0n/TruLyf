import { Component, OnInit  } from '@angular/core';
import {FormGroup,FormControl ,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { event } from 'jquery';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  reactiveForm : FormGroup;
  radioValue : string;
  // radioButtonGroup : FormGroup;
  userName : string;
  password : string;
  /**
   *
   */
  constructor(private router: Router) {
    this.userName = "client";
    this.password = "12345";
  }
  ngOnInit()
  {
    this.reactiveForm=new FormGroup({
      userName : new FormControl(null,Validators.required),
      password : new FormControl(null,Validators.required)
    });

  }
  Signin()
  {
    if(this.reactiveForm.get('userName').value==this.userName && this.reactiveForm.get('password').value==this.password)
    {
      this.router.navigate(['/ClientHome']);
    }
    else
    {
      console.log("Invalid");
    }
  }
  radioValueChange(value : string)
  {
    this.radioValue = value;
    if(value == 'Agent')
    {
    document.getElementById("imgField").style.background="linear-gradient(160deg, #f12711, #f5af19)";
    }
    else if(value == 'Company')
    {
     document.getElementById("imgField").style.background="linear-gradient(130deg, #ed213a, #93291e)";
    }
    else
    {
     document.getElementById("imgField").style.background="linear-gradient(160deg, #0093e9 0%, #80d0c7 100%)";
    }
  }
}
