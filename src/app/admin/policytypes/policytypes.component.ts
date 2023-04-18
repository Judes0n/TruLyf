import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Policytype } from 'src/app/models/policytype';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-policytypes',
  templateUrl: './policytypes.component.html',
  styleUrls: ['./policytypes.component.scss']
})
export class PolicytypesComponent implements OnInit {
  ptypes : Policytype[] = [];
  typeForm : FormGroup;
  constructor(private adminservice : AdminService){ }

  ngOnInit(): void {
    this.typeForm = new FormGroup({
      typename : new FormControl(null,Validators.required)
    });

    this.adminservice.ViewAllTypes().subscribe({next : (type)=>{
      this.ptypes = type;
     },
     error : (response)=>{
       console.log(response);
     }
      });
  }

  Sub()
  {
    this.adminservice.AddPolicyType(this.typeForm.get('typename').value);
    this.ngOnInit();
  }

}
