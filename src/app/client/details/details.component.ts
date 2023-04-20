import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  policyId : number;

  constructor(private acroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.policyId = +this.acroute.snapshot.paramMap.get('policyId');
  }
}
