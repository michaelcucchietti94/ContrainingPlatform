import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RankingComponent } from './ranking/ranking.component';
import { MapComponent } from './map/map.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { UserLayoutModule } from './user-layout/user-layout.module';
import { MainUserLayoutComponent } from './user-layout/main-user-layout/main-user-layout.component';
import { UserProfileModule } from './user-profile/user-profile.module';
import { GameChoiceComponent } from './game-choice/game-choice.component';



@NgModule({
  declarations: [DashboardComponent, RankingComponent, MapComponent, TutorialComponent, GameChoiceComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    UserLayoutModule,
    UserProfileModule
  ]
})
export class GameDashboardModule {
  
}
