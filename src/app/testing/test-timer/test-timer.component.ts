import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/service/utility/Utility.service';
import { TestTimerBridge } from '../TestTimerBridge.service';

@Component({
  selector: 'app-test-timer',
  templateUrl: './test-timer.component.html',
  styleUrls: ['./test-timer.component.css']
})
export class TestTimerComponent implements OnInit {
  private timerElement : HTMLElement;
	private hourDisk : HTMLElement;
	private minuteDisk : HTMLElement;
	private secondDisk : HTMLElement;
	private timeWrite : HTMLElement;

	private hourRoundValue : number = 2;
	private timerValue : number = 0;
	private timeoutID = null;

	@Output() timerEnd = new EventEmitter();


	constructor(private utility : UtilityService, private timerBridge : TestTimerBridge) {
		timerBridge.timer = this;
	}


	private convertInSeconds(hours : number, minutes : number, seconds : number) : number {
		return hours*60*60 + minutes*60 + seconds;
	}

	private maxHourValue() : number {
		return this.convertInSeconds(this.hourRoundValue, 59, 59);
	}
	private maxMinuteValue() : number {
		return this.convertInSeconds(0, 60,0);
	}
	private maxSecondValue() : number {
		return this.convertInSeconds(0,0,60);
	}

	private getHoursDeg(timerSeconds : number) {
		let x = Math.min(timerSeconds, this.maxHourValue());
		x = Math.max(0, timerSeconds);

		return (360 / this.maxHourValue()) * x;
	}
	private getMinuteDeg(timerSeconds : number) {
		let x = timerSeconds % (60*60);
		let deg = (360 / this.maxMinuteValue()) * x;
		
		return (360 / this.maxMinuteValue()) * x;
	}
	private getSecondDeg(timerSeconds : number) {
		let x = timerSeconds % 60;
		let deg = (360 / this.maxSecondValue()) * x;
		return deg;
	}


	private setHourStyle(timerSeconds : number) {
		this.hourDisk.style.transform = 'rotate(' + this.getHoursDeg(timerSeconds) + 'deg)';
	}
	private setMinuteStyle(timerSeconds : number) {
		this.minuteDisk.style.transform = 'rotate(' + this.getMinuteDeg(timerSeconds) + 'deg)';
	}
	private setSecondStyle(timerSeconds : number) {
		this.secondDisk.style.transform = 'rotate(' + this.getSecondDeg(timerSeconds) + 'deg)';
	}
	private setStyle(timerSeconds : number) {
		this.setHourStyle(timerSeconds);
		this.setMinuteStyle(timerSeconds);
		this.setSecondStyle(timerSeconds);
	}

	private calculateRemainingHours() : number {
		return Math.floor(this.timerValue / 3600);
	}
	private calculateRemainingMinutes() : number {
		let m_in_seconds : number = this.timerValue % (60*60);
		return Math.floor(m_in_seconds / 60);
	}
	private calculateRemainingSeconds() : number {
		return Math.floor(this.timerValue % (60));
	}
	private setRemainingText() {
		let hourText : string = this.calculateRemainingHours().toString();
		if(hourText.length < 2)
			hourText = '0' + hourText;

		let minuteText : string = this.calculateRemainingMinutes().toString();
		if(minuteText.length < 2)
			minuteText = '0' + minuteText;

		let secondText : string = this.calculateRemainingSeconds().toString();
		if(secondText.length < 2)
			secondText = '0' + secondText;
					
		let text : string =  hourText + ":" + minuteText + ":" + secondText;
		this.timeWrite.innerText = text;
	}


	private clearTimeout() {
		if(this.timeoutID != null) {
			clearInterval(this.timeoutID);
			this.timeoutID = null;
		}
	}
	private startTimer() {
		this.timeoutID = setInterval(() => {
			this.setRemainingText();
			if(this.timerValue === 0) {
				this.stop();
				this.timerEnd.emit();
			} else {
				this.setStyle(this.timerValue -= 0.01);
			}
			
		}, 10);
	}

	stop() {
		this.clearTimeout();
		this.setStyle(0);
	}

	pause() {
		this.clearTimeout();
	}
	resume() {
		this.clearTimeout();
		this.startTimer();
	}

	start(timerSeconds : number) {
		this.clearTimeout();
		this.timerValue = timerSeconds;
		this.startTimer();
	}

  ngOnInit() {
	this.timerElement = document.getElementById('testTimer');
	this.hourDisk = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'hours')[0];
	this.minuteDisk = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'minutes')[0];
	this.secondDisk = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'seconds')[0];
	this.timeWrite = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'text')[0];
	this.timerValue = 0;
	this.setRemainingText();
  }

}
