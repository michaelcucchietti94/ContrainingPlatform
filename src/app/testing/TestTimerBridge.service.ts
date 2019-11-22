import { Injectable } from "@angular/core";
import { TestTimerComponent } from './test-timer/test-timer.component';

@Injectable({
    providedIn: 'root'
})
export class TestTimerBridge {
    timer : TestTimerComponent = null;
}