import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { GameDashboardModule } from './game-dashboard/game-dashboard.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TestingModule } from './testing/testing.module';
import { AdminModule } from './admin/admin-dashboard/admin.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    GameDashboardModule,
    TestingModule,
    AdminModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
