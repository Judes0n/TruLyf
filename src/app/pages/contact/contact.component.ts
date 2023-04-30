import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm : FormGroup = new FormGroup({feed : new FormControl(null,Validators.required)});
  constructor(private http: HttpClient){}
  submit()
  {
    let feedback : Feedback;
    feedback = {
      fid : 0,
      feed : this.contactForm.get("feed").value
    };
    this.http.post(environment.baseApiUrl+'/api/User/Feed',feedback).subscribe(res=>{
      alert("Send Feedback Successfully!!");
      this.contactForm.get('feed').setValue("");
    });
  }
}
