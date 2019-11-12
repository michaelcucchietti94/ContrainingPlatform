import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';
import { AdminRoutingModule } from '../admin-dashboard/admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { LayoutModule } from '../layout/layout.module';






@NgModule({
  declarations: [AdminDashboardComponent, TestComponent, UserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule
  ]
})
export class AdminModule {
}
