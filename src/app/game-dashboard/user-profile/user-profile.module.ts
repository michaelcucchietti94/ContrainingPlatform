import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChartradarUserComponent } from './chartradar-user/chartradar-user.component';
import { ChartlineUserComponent } from './chartline-user/chartline-user.component';
import { RouterModule } from '@angular/router';
import { GraphicsModule } from 'src/app/graphics/graphics.module';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [UserProfileComponent, ChartradarUserComponent, ChartlineUserComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ]
})
export class UserProfileModule { }
