import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      "Content-type":"application/json"
    })
  };
  // filterCustomer(data: any):  Observable<any>{
  //   // let params =  new URLSearchParams();
  //   // params.append("Name", this.Name)
  //   const params = new HttpParams({fromObject: data});
  //   return this.http.get<any>("https://localhost:7038/api/Customers/filter?/",{params: params, headers: this.httpOptions.headers})
  //   .pipe(map((res: any)=>{
  //     return res;
  //   }))
  filterCustomer(data: any):  Observable<any>{
    return this.http.post<any>("https://localhost:7038/api/Customers/filter", data, this.httpOptions)
    .pipe(map((res: any)=>{
      return res;
    }))
    
  }
  getfilteredCustomer(): Observable<any>{
    return this.http.get<any>("https://localhost:7038/api/Customers/filter",this.httpOptions)
    .pipe(map((res: any)=>{
      return res.data;
    }))
  }
  }

