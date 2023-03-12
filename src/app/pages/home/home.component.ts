import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
homeScript : HTMLScriptElement;
constructor()
{

  this.homeScript=document.createElement("script");
  this.homeScript.src="assets/js/main.js";
  document.body.appendChild(this.homeScript);
  this.homeScript.src="assets/js/jquery.counterup.js";
  document.body.appendChild(this.homeScript);


}
}
