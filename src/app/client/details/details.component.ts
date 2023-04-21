import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Policy } from 'src/app/models/policy';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  policyId: number;
  policy : Policy;
  constructor(private acroute: ActivatedRoute,private clientservice : ClientService) { }

  ngOnInit(): void {
    this.policyId = +this.acroute.snapshot.paramMap.get('policyId');
    this.clientservice.GetPolicy(this.policyId).subscribe(
      res=>{
        this.policy = res;
      }
    );
  }
}
