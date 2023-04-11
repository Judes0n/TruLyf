import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class AgentViewComponent implements OnInit {
  choice : number;
  ngOnInit(): void {
    this.choice = 1;
  }
  readSession(key : string) : string
  {
    return sessionStorage.getItem(key);
  }
  ChangeChoice(ch : number)
  {
    this.choice = ch;
  }
}
