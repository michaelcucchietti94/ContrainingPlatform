import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MainUserLayoutComponent } from './user-layout/main-user-layout/main-user-layout.component';

const routes : Routes = [
    {path: 'dashboard', component: MainUserLayoutComponent, children: [
        {path: '', component: DashboardComponent},
        {path: 'tutorial', component: TutorialComponent}
    ]}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {}