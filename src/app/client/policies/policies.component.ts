import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/models/policy';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class CPoliciesComponent implements OnInit {
  policies : Policy[] = [];

  constructor(private clientservices : ClientService){}

  ngOnInit(): void {
    this.policies = [];
    this.clientservices.GetPolicies(0,0,0).subscribe(res=>{
      this.policies = res;
    });
  }
}
