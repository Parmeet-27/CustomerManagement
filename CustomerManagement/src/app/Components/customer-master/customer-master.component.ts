import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomerMasterService } from '../../Services/customer-master.service';
import { CustomerModel } from '../../Models/customer-master.model';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { error } from 'console';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrl: './customer-master.component.css'
})
export class CustomerMasterComponent {

  customermasterForm!: FormGroup;
  customerModelObj : CustomerModel = new CustomerModel();
  CustomerData: any;
  constructor(private fb: FormBuilder,private cust:CustomerMasterService,private toastr: ToastrService){}
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
   this.getAllCustomer();
  }
  // postCustomerDetails(){
  //   this.customerModelObj.accountNumber = this.customermasterForm.value.accountNumber;
  //   this.customerModelObj.name = this.customermasterForm.value.name;
  //   this.customerModelObj.registrationDate = this.customermasterForm.value.registrationDate;
  //   this.customerModelObj.validFrom = this.customermasterForm.value.validFrom;
  //   this.customerModelObj.validTo = this.customermasterForm.value.validTo;
  //   this.customerModelObj.hazmatCertified = this.customermasterForm.value.hazmatCertified;
  //   this.customerModelObj.holdNote = this.customermasterForm.value.holdNote;

  //   this.cust.postCustomer(this.customerModelObj)
  //   .subscribe(
  //     {
  //       next: (res) => {
  //         console.log(res);
  //         alert("Added");
  //        // this.customermasterForm.reset();
  //       },
    
  //       error: (err: any) => { alert("Failed"); },
        
  //     }
  //   );
  //   // this.activatedRoute.queryParams.subscribe(queryParams => {
  //   //   console.log("queryParams, queryParams)
      
  //   //   }, error => {
  //   //   })
  //   // .subscribe((result: any)=>{
  //   //     console.log(result.data);
  //   //     alert("Added");
  //   //   },
  //   //   (err: any)=>{
  //   //     alert("Failed");
  //   //   });
  //   // error =>{
  //   //   alert("Failed")

  //   // })

  // }

  onSubmit(){
    
    if(this.customermasterForm.valid){
      //let data = this.customermasterForm.value;
      console.log(this.customermasterForm.value)
      // this.cust.saveCustomerData(this.customermasterForm.value).subscribe((result: any)=>{
      //   console.log(result.data);
      // });
      debugger
      this.customerModelObj.accountNumber = this.customermasterForm.value.accountNumber;
      this.customerModelObj.name = this.customermasterForm.value.name;
      this.customerModelObj.registrationDate = this.customermasterForm.value.registrationDate;
      this.customerModelObj.validFrom = this.customermasterForm.value.validFrom;
      this.customerModelObj.validTo = this.customermasterForm.value.validTo;
      this.customerModelObj.hazmatCertified = this.customermasterForm.value.hazmatCertified;
      this.customerModelObj.holdNote = this.customermasterForm.value.holdNote;
      this.customerModelObj.businessName = this.customermasterForm.value.businessName;
      this.customerModelObj.addressLine1 = this.customermasterForm.value.addressLine1;
      this.customerModelObj.addressLine2 = this.customermasterForm.value.addressLine2;
      this.customerModelObj.addresstypeid = this.customermasterForm.value.addresstypeid;
      this.customerModelObj.city = this.customermasterForm.value.city;
      this.customerModelObj.state = this.customermasterForm.value.state;
      this.customerModelObj.zipcode = this.customermasterForm.value.zipcode;
      this.customerModelObj.countrycode = this.customermasterForm.value.countrycode;
      this.customerModelObj.phoneNumber = this.customermasterForm.value.phoneNumber;
      this.customerModelObj.email = this.customermasterForm.value.email;
      

      this.cust.postCustomer(this.customerModelObj)
      .subscribe(
      {
        
        next: (res) => {
          console.log(res);
          this.toastr.success('Customer Added', 'Success', {
            timeOut: 3000
          });
          //
          //alert("Added");
          let ref = document.getElementById('cancel');
          ref?.click();
          this.customermasterForm.reset();
         this.getAllCustomer();
        },
    
        // error: (err: any) => { throwError(error);
        //   alert("Failed"); },
        
      });
    }
    else{
      //console.log("Form is not valid");
      this.validateAllFormFields(this.customermasterForm);
      this.toastr.error("Invalid Form", 'error');
       //alert("Invalid Form")
    }
  }
  
  getAllCustomer(){
    debugger
    this.cust.getCustomer()
    .subscribe(res=>{
      this.CustomerData = res;
    })
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
