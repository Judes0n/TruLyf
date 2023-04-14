import { Component, OnInit } from '@angular/core';
import { Clientpolicy } from 'src/app/models/clientpolicy';
import { AgentService } from 'src/app/services/Agent/agent.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  choice : number;
  cpolicies : Clientpolicy[] = [];

  constructor(private agentservices : AgentService) {}

  ngOnInit(): void {
    this.choice = 1;
    this.agentservices.GetClientPolicies(+this.readSession('userID')).subscribe(res=>{
      res.forEach(cpolicy => {
        if(cpolicy.status == 1)
        {
          this.cpolicies.push(cpolicy);
        }
      });
    })
  }

  ChangeChoice(ch : number)
  {
    this.choice = ch;
  }

  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }



}
