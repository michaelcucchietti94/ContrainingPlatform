import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/service/utility/Utility.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}


class ContrainingTimer {
	private timerElement : HTMLElement;
	private hourDisk : HTMLElement;
	private minuteDisk : HTMLElement;
	private secondDisk : HTMLElement;

	private hourRoundValue : number = 6;
	


	constructor(private utility : UtilityService) {
		this.timerElement = document.getElementById('testTimer');
		this.hourDisk = <HTMLElement>utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'hours')[0];
		this.minuteDisk = <HTMLElement>utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'minutes')[0];
		this.secondDisk = <HTMLElement>utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'seconds')[0];
	}


	private convertInSeconds(hours : number, minutes : number, seconds : number) : number {
		return hours*60^2 + minutes*60 + seconds;
	}

	private maxHourValue() : number {
		return this.convertInSeconds(this.hourRoundValue, 59, 59);
	}
	private maxMinuteValue() : number {
		return this.convertInSeconds(0, 59, 59);
	}
	private maxSecondValue() : number {
		return this.convertInSeconds(0,0,59);
	}

	private getHoursDeg(timerSeconds : number) {
		let x = Math.min(timerSeconds, this.maxHourValue());
		x = Math.max(0, timerSeconds);

		return (360 / this.maxHourValue()) * x;
	}
	private getMinuteDeg(timerSeconds : number) {
		let x = timerSeconds % 3600;
		
		return (360 / this.maxMinuteValue()) * x;
	}
	private getSecondDeg(timerSeconds : number) {
		let x = timerSeconds % 60;
		return (360 / this.maxSecondValue()) * x;
	}


	private setHourStyle(timerSeconds : number) {
		this.hourDisk.style.transform = 'rotate(' + this.getHoursDeg(timerSeconds) + 'deg)';
	}
	private setMinuteStyle(timerSeconds : number) {
		this.minuteDisk.style.transform = 'rotate(' + this.getMinuteDeg(timerSeconds) + 'deg)';
	}
	private setSecondStyle(timerSeconds : number) {
		this.minuteDisk.style.transform = 'rotate(' + this.getSecondDeg(timerSeconds) + 'deg)';
	}



}