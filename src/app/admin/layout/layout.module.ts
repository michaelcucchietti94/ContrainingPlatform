import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import { GraphicsModule } from 'src/app/graphics/graphics.module';
import { ChartsModule } from 'ng2-charts';
import { ChartradarComponent } from './chartradar/chartradar.component';
import { ChartlineComponent } from './chartline/chartline.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ],
  declarations: [AdminHeaderComponent, AdminLayoutComponent, AdminMenuComponent, ChartradarComponent, ChartlineComponent]
})
export class LayoutModule { }
