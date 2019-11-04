import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RankingComponent } from './ranking/ranking.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [DashboardComponent, DashboardHeaderComponent, ProfileComponent, RankingComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameDashboardModule {
}
