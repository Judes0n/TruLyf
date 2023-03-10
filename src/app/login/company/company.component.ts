import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  reactiveForm : FormGroup;
  userName : string;
  password : string;

  constructor(private router : Router)
  {
    this.userName = "company";
    this.password = "12345";
  }

  ngOnInit(): void
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
}
