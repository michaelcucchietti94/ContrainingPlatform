import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './admin-layout/admin-main-header/admin-layout.component';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { AdminProfileModule } from './admin-profile/admin-profile.module';
import { AdminRoutingModule } from './admin-routing.module';






@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminLayoutModule,
    AdminProfileModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule {
}
