import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CustomerManagement';
  // BasicInfo(customermasterForm: NgForm): void{
  //   console.log(customermasterForm.value);
  // }
  RegisterCustomer(customerForm: NgForm) {   
      console.log(customerForm.value);
    }
}
