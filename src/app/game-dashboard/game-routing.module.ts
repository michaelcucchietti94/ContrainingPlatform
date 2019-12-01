import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MainUserLayoutComponent } from './user-layout/main-user-layout/main-user-layout.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { GameChoiceComponent } from './game-choice/game-choice.component';
import { MapComponent } from './map/map.component';
import { TestComponent } from '../testing/test/test.component';

const routes : Routes = [
    {path: 'dashboard', component: MainUserLayoutComponent, children: [
        {path: '', component: DashboardComponent},
        {path: 'tutorial', component: TutorialComponent},
        {path:'profile', component:UserProfileComponent},
        {path:'gamechoices', component:GameChoiceComponent},
        {path:'map', component:MapComponent},
        {path:'test', component:TestComponent}
    ]}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {}