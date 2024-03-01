import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerModel } from '../../Models/customer-master.model';
import { CustomerMasterService } from '../../Services/customer-master.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../Services/customer.service';
import { CustomerFilterModel } from '../../Models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: 'customer.component.html',
  styleUrl: 'customer.component.css'
})
export class CustomerComponent implements OnInit{
  title = "Customer Management";
  CustomerData: any;
  CustomerFilterData: any;
  customerForm!: FormGroup;
  customermasterForm!: FormGroup;
  customerModelObj : CustomerModel = new CustomerModel();
  customerFilterObj : CustomerFilterModel = new CustomerFilterModel();
 
  constructor(private fb: FormBuilder,private customer:CustomerService,private cust:CustomerMasterService,private toastr: ToastrService){}
  ngOnInit(): void {
    this.customermasterForm = this.fb.group({
      accountNumber: ['', [Validators.required,Validators.minLength(5)]],
        name: ['', Validators.required],
        registrationDate: [''],
        validFrom: ['', Validators.required],
        validTo: [''],
        hazmatCertified: [''],
        holdNote: [''],
        businessName: ['',[Validators.required,Validators.minLength(6)]],
        countrycode: ['',Validators.required],
        zipcode: ['',[Validators.required,Validators.pattern(new RegExp("[0-9 ]{5}"))]],
        city: ['',Validators.required],
        state: ['',Validators.required],
        addressLine1: ['',Validators.required],
        addressLine2: ['',Validators.required],
        phoneNumber: ['',[Validators.required,Validators.pattern(new RegExp("^((\\+91-?)|0)?[0-9]{10}$"))]],
        //phoneno: ['',[Validators.required,Validators.pattern(new RegExp("[0-9 ]{12}"))]],
        email: ['',[Validators.required,Validators.email]],
        longitude: [''],
        latitude: [''],
        addresstypeid: ['',Validators.required],
    })
    this.customerForm = this.fb.group({
       accountNumber: ['',Validators.minLength(5)],
       name: ['', Validators.required],
       countrycode: [''],
        zipcode: ['',Validators.pattern(new RegExp("[0-9 ]{5}"))],
        city: [''],
        state: [''],
        inventoryacc: [''],
        accountid: [''],
        company: ['']
      })
    this.getAllCustomer();
  }
 // onSubmit(){
    //debugger
    // if(this.customermasterForm.valid){
     
    // this.customerModelObj.accountNumber = this.customermasterForm.value.accountNumber;
    // this.customerModelObj.name = this.customermasterForm.value.name;
    // this.customerModelObj.validFrom = this.customermasterForm.value.validFrom;
    // this.customerModelObj.validTo = this.customermasterForm.value.validTo;
    // this.customerModelObj.hazmatCertified = this.customermasterForm.value.hazmatCertified;
    // this.customerModelObj.holdNote = this.customermasterForm.value.holdNote;
    // this.customerModelObj.businessName = this.customermasterForm.value.businessName;
    // this.customerModelObj.addressLine1 = this.customermasterForm.value.addressLine1;
    // this.customerModelObj.addressLine2 = this.customermasterForm.value.addressLine2;
    // this.customerModelObj.addresstypeid = this.customermasterForm.value.addresstypeid;
    // this.customerModelObj.city = this.customermasterForm.value.city;
    // this.customerModelObj.state = this.customermasterForm.value.state;
    // this.customerModelObj.zipcode = this.customermasterForm.value.zipcode;
    // this.customerModelObj.countrycode = this.customermasterForm.value.countrycode;
    // this.customerModelObj.phoneNumber = this.customermasterForm.value.phoneNumber;
    // this.customerModelObj.email = this.customermasterForm.value.email;
    

    // this.cust.postCustomer(this.customerModelObj)
    // .subscribe(
    //   {
    //     next: (res) => {
    //       console.log(res);
    //       this.toastr.success('Customer Added', 'Success', {
    //         timeOut: 3000
    //       });
    //       //alert("Added");
    //       let ref = document.getElementById('cancel');
    //       ref?.click();
    //       this.customermasterForm.reset();
    //       this.getAllCustomer();
    //     },
    
    //     error: (err: any) => { alert("Failed"); },
        
    //   }
    // );
    // }
    // else{
    //   this.validateAllFormFields(this.customermasterForm);
    // }
  //}
  getAllCustomer(){
   
    this.cust.getCustomer()
    .subscribe(res=> {
     // debugger
      this.CustomerData = res.data;
      console.log(this.CustomerData);
    })
  }
  deleteCustomer(row: any){
    this.cust.deleteCustomer(row.customerMasterGUID)
    .subscribe(res=>{
      this.toastr.success('Customer Deleted', 'Success', {
        timeOut: 3000
      });
      //alert("Customer Deleted");
    })
  }
  onFilter(){
    if(this.customerForm.valid){
      console.log(this.customerForm.value);
      this.customerFilterObj.accountNumber = this.customerForm.value.accountNumber;
      this.customerFilterObj.name = this.customerForm.value.name;

      this.customer.filterCustomer(this.customerFilterObj)
      .subscribe(
        {
          
          next: (res) => {
            console.log(res);
            this.CustomerData = res.data;
           
          },
      
          
        });
    }
  }
 
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf : true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
 
}
