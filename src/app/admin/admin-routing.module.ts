import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const routes : Routes = [
    {path: 'admin-dashboard', component: AdminDashboardComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
