import { AdminDashboardComponent } from "../admin/admin-dashboard/admin-dashboard.component";
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
 { path: 'admin-dashboard', component: AdminLayoutComponent, children:[
   { path: '', component: AdminDashboardComponent}
]}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }