import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminRoutingModule } from './admin-routing.module';




@NgModule({
  declarations: [AdminDashboardComponent, AdminHeaderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminDashboardModule {
}
