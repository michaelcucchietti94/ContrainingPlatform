import { Injectable } from "@angular/core";
import { DashboardComponent } from 'src/app/game-dashboard/dashboard/dashboard.component';
import { TutorialComponent } from 'src/app/game-dashboard/tutorial/tutorial.component';

@Injectable({
    providedIn: 'root'
})
export class DashboardTutorialService {
    dashboard : DashboardComponent = null;
    tutorial : TutorialComponent = null;

    hideTutorialCloseButton() {
        if(this.tutorial == null)
            return;
        
            
        this.tutorial.hideCloseButton();
    }
    startTutorialAnimation() {
        this.tutorial.doTypingAnimation();
    }
}