import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.scss'],
})
export class ClienthomeComponent implements OnInit {
  client : Client;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {

  }
}
