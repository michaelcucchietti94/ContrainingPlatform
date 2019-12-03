import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../admin-layout/admin-header/admin-header.component';
import { AdminLayoutComponent } from '../admin-layout/admin-main-header/admin-layout.component';
import { AdminMenuComponent } from '../admin-layout/admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import { GraphicsModule } from 'src/app/graphics/graphics.module';
import { ChartsModule } from 'ng2-charts';
import { ChartradarComponent } from '../admin-profile/chartradar/chartradar.component';
import { ChartlineComponent } from '../admin-profile/chartline/chartline.component';
import { CharthbarComponent } from '../admin-profile/charthbar/charthbar.component';
import { ChartbarComponent } from '../admin-profile/chartbar/chartbar.component';
import { AdminProfileComponent } from '../admin-profile/admin-profile/admin-profile.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ],
  declarations: [AdminHeaderComponent, AdminLayoutComponent, AdminMenuComponent, ChartradarComponent, ChartlineComponent, CharthbarComponent, ChartbarComponent, AdminProfileComponent]
})
export class LayoutModule { }
