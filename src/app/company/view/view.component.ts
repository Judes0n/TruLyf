import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class CompanyViewComponent implements OnInit {
  choice : number;
  ngOnInit()
  {
    this.choice=1;
  }

  ChangeChoice(ch : number)
  {
    this.choice = ch;
  }
}
