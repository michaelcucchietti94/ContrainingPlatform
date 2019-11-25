import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RankingComponent } from './ranking/ranking.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { MapComponent } from './map/map.component';
import { TutorialComponent } from './tutorial/tutorial.component';



@NgModule({
  declarations: [DashboardComponent, DashboardHeaderComponent, RankingComponent, MapComponent, TutorialComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameDashboardModule {
  
}
