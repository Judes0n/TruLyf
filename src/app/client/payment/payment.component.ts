import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  clientpolicyId: number;
  paymentForm: FormGroup;
  numericInput: string;
  expiryDateInvalid: boolean;
  a : boolean;
  amount : number;
  loaded : boolean = false;
  constructor(private acroute: ActivatedRoute , private clientservice : ClientService) { }
 async ngOnInit(){
    this.a = false;
    this.clientpolicyId = +this.acroute.snapshot.paramMap.get('clientpolicyId');
    this.amount =(await this.clientservice.GetTerm(this.clientpolicyId).toPromise()).premiumAmount;
    this.paymentForm = new FormGroup({
      cnum: new FormControl('', [Validators.required]),
      cname: new FormControl(null, [Validators.required]),
      exp: new FormControl(null, [Validators.required, this.expiryDateValidator]),
      cvv: new FormControl(null, [Validators.required]),
      amount : new FormControl(this.amount)
    });
    this.loaded = true;
  }

  expiryDateValidator(control) {
    const expiryDate = control.value;

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return { invalidExpiryDate: true };
    }

    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
      return { expiredExpiryDate: true };
    }

    return null;
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    var sanitizedValue = inputElement.value.replace(/[^0-9]/g, '');

    this.paymentForm.get('cnum').setValue(sanitizedValue.slice(0, 16));
    if (sanitizedValue.length > 16) {
      sanitizedValue = sanitizedValue.slice(0, 16);
    }

    if (sanitizedValue.length > 4) {
      sanitizedValue = sanitizedValue.replace(/(\d{4})/g, '$1 ').trim();
    }
    this.paymentForm.get('cnum').setValue(sanitizedValue);
  }

  onExpiryDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/[^0-9]/g, '');

    if (value.length > 2) {
      var month = value.slice(0, 2);
      var year = value.slice(2);

      if (+month > 12) {
        month = '12';
      }

      value = month +'/'+ year;
    }

    this.paymentForm.get('exp').setValue(value);
    this.expiryDateInvalid = !this.isValidExpiryDate(value);
  }

  isValidExpiryDate(value: string): boolean {
    if (value.length < 4) {
      return false; // Expiry date should have at least 4 characters (MMYY or MM/YYYY)
    }

    const month = parseInt(value.slice(0, 2), 10);
    const year = parseInt(value.slice(-2), 10);
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year

    if (isNaN(month) || isNaN(year)) {
      return false; // Invalid month or year
    }

    if (month < 1 || month > 12) {
      return false; // Month should be between 1 and 12
    }

    if (year < currentYear) {
      return false; // Year should be greater than or equal to the current year
    }

    return true; // Expiry date is valid
  }

  verify()
  {
    this.a = !this.a;
  }
}
