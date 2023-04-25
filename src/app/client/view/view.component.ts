import { Component, OnInit } from '@angular/core';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { Maturity } from 'src/app/models/maturity';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ClientViewComponent implements OnInit {

  choice : number;
  cpolicies : Clientpolicy[];
  mpolicies : Maturity[];
  constructor(private clientservice : ClientService) {}
  async ngOnInit() {
    let clientId = (await this.clientservice.GetClientById(+this.readSession('userID')).toPromise()).clientId;
    this.choice = 1;
    this.cpolicies = [];
    this.mpolicies = [];

    this.clientservice.GetCPolicy(clientId).subscribe(res=>{
      res.forEach(cpol=>{
        if(cpol.status < 3 )
          this.cpolicies.push(cpol);
      });
    });
    this.clientservice.GetMPolicies(clientId).subscribe(res=>{
      this.mpolicies = res;
    });
  }

  ChangeChoice(choice : number)
  {
    this.choice = choice;
  }

  readSession(key: string): string {
    return sessionStorage.getItem(key);
  }

  payment(clientPolicyId : number){

  }
}
