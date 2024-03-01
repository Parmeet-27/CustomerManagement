import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerMasterService {

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      "Content-type":"application/json"
    })
  };

  // postCustomerDetails(data: any){
  //   this.postCustomer(data);
  //   this.postCustomerAddr(data);
  // }

  postCustomer(data: any):  Observable<any>{
    return this.http.post<any>("https://localhost:7038/api/Customers/AddCustomer", data, this.httpOptions)
    .pipe(map((res: any)=>{
      return res;
    }))
    
  }
  
  // postCustomerAddr(data: any):  Observable<any>{
  //   return this.http.post<any>("https://localhost:7038/api/Customers", data, this.httpOptions)
  //   .pipe(map((res: any)=>{
  //     return res;
  //   }))
    
  // }
  getCustomer(): Observable<any>{
    return this.http.get<any>("https://localhost:7038/api/Customers/GetAllCustomers",this.httpOptions)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  // getfilterCustomer(): Observable<any>{
  //   return this.http.get<any>("https://localhost:7038/api/Customers/GetAllCustomers",this.httpOptions)
  //   .pipe(map((res: any)=>{
  //     return res;
  //   }))
  // }
  deleteCustomer(name: string): Observable<any>{
    return this.http.delete<any>("https://localhost:7038/api/Customers/"+name)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  updateCustomer(data: any):  Observable<any>{
    return this.http.post<any>("https://localhost:7038/api/Customers/UpdateCustomer", data, this.httpOptions)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  // create(customerModelObj: any){
  //   this.http.post<any>("")
  // }
   
  
  // saveCustomerData(data: any){
  //   console.log(data);
  //   return this.http.get(this.url,data);
  // }
}
