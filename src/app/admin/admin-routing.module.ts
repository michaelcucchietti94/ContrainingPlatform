import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AdminProfileComponent } from './admin-profile/admin-profile/admin-profile.component';
import{AdminLayoutComponent} from './admin-layout/admin-main-header/admin-layout.component';
import { AnalisiAdminComponent } from './admin-profile/analisi-admin/analisi-admin.component';



const routes: Routes = [
    {path: 'admin-dashboard', component: AdminLayoutComponent,children:[
        { path: '', component: AdminProfileComponent},
        { path: 'analisi', component: AnalisiAdminComponent},
    ]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
