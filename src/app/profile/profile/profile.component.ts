import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private userid : number;

 constructor(private route : ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userid = params['userid'];
    });
  }
}
