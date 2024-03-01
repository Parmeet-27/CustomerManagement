import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Components/customer/customer.component';
import { CustomerMasterComponent } from './Components/customer-master/customer-master.component';

const routes: Routes = [
  {
    path: '', redirectTo:'customer', pathMatch: "full"
  },
  {
    path:'customer', component: CustomerComponent
  },
  {
    path:'customermaster', component: CustomerMasterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
