import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { RouterModule } from '@angular/router';
import { MainUserLayoutComponent } from './main-user-layout/main-user-layout.component';



@NgModule({
  declarations: [DashboardHeaderComponent, MainUserLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserLayoutModule { }
