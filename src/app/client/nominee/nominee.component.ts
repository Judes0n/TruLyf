import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Nominee } from 'src/app/models/nominee';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-nominee',
  templateUrl: './nominee.component.html',
  styleUrls: ['./nominee.component.scss']
})
export class NomineeComponent implements OnInit {

  nomineeForm: FormGroup;
  nominees : Nominee[] = [];
  client : Client;

  constructor(private clientservice : ClientService){}

  ngOnInit(): void {
    this.nomineeForm = new FormGroup({
      nomineename: new FormControl(null, Validators.required),
      relation: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNum: new FormControl(null, Validators.required)
    });
    this.clientservice.GetClientById(+this.readSession('userID')).subscribe(res=>{
      this.client = res;
    });
    this.clientservice.ViewNominees(this.client.clientId).subscribe((nominee)=>{
      this.nominees = nominee;
      console.log(nominee);
     });
  }
  Sub() {
    let nominee : Nominee = {
      nomineeId : 0,
      clientId : this.client.clientId,
      nomineeName : this.nomineeForm.get('nomineename').value,
      relation : this.nomineeForm.get('relation').value,
      address : this.nomineeForm.get('address').value,
      phoneNum : this.nomineeForm.get('phoneNum').value
    }
    this.clientservice.AddNominee(nominee);
    this.ngOnInit();
  }
  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }
}
