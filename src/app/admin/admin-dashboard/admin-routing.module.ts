import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';


const routes: Routes = [
    {path: 'admin-dashboard', component: AdminLayoutComponent,children:[
        {path:'',component: AdminDashboardComponent}
    ]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
