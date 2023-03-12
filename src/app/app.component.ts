import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'TruLyf';
  onActivate(event) {
    // window.scroll(0,0);

    window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
     });

     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)

 }

}
