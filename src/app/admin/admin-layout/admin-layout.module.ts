import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-main-header/admin-layout.component';



@NgModule({
  declarations: [AdminHeaderComponent, AdminMenuComponent, AdminLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminLayoutModule { }
