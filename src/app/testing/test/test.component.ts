import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/service/utility/Utility.service';
import { TestTimerBridge } from '../TestTimerBridge.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
	


	constructor(private utility : UtilityService, private testTimerBridge : TestTimerBridge) {
		
	}

	ngOnInit() {
		this.start();
	}

	start() {
		this.testTimerBridge.timer.start(500);
	}

}