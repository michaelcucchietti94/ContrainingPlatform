import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ChartradarComponent } from './chartradar/chartradar.component';
import { ChartlineComponent } from './chartline/chartline.component';
import { CharthbarComponent } from './charthbar/charthbar.component';
import { ChartbarComponent } from './chartbar/chartbar.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [AdminProfileComponent, ChartradarComponent, ChartlineComponent, CharthbarComponent, ChartbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ]
})
export class AdminProfileModule { }
