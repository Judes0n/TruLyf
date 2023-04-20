import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ClientViewComponent implements OnInit {

  choice : number;

  ngOnInit(): void {
    this.choice = 1;
  }

  ChangeChoice(choice : number)
  {
    this.choice = choice;
  }
}
