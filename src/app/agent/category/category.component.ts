import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  choice : number;
  ngOnInit(): void {
    this.choice = 1;
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
