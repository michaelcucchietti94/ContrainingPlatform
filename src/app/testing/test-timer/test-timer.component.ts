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
	private minuteDisk : HTMLElement;
	private secondsDisk : HTMLElement;
	private millisDisk : HTMLElement;
	private timeWrite : HTMLElement;

	private hourRoundValue : number = 2;
	private timerValue : number = 0;
	private timeoutID = null;

	@Output() timerEnd = new EventEmitter();


	constructor(private utility : UtilityService, private timerBridge : TestTimerBridge) {
		timerBridge.timer = this;
	}


	private convertInMillis(minutes : number, seconds : number, milliseconds : number) : number {
		return minutes*60*100 + seconds*100 + milliseconds;
	}

	private maxMinuteValue() : number {
		return this.convertInMillis(59, 59, 99);
	}
	private maxSecondsValue() : number {
		return this.convertInMillis(0, 60,0);
	}
	private maxMillisecondValue() : number {
		return this.convertInMillis(0,0,99);
	}

	private getMinutesDeg(timerMillis : number) {
		let x = Math.min(timerMillis, this.maxMinuteValue());
		x = Math.max(0, timerMillis);

		return (360 / this.maxMinuteValue()) * x;
	}
	private getSecondsDeg(timerMillis : number) {
		let x = timerMillis;
		let deg = (360 / this.maxSecondsValue()) * x;
		
		return (360 / this.maxSecondsValue()) * x;
	}
	private getMillisecondsDeg(timerMillis : number) {
		let x = timerMillis % 100;
		let deg = (360 / this.maxMillisecondValue()) * x;
		return deg;
	}


	private setMinutesStyle(timerSeconds : number) {
		this.minuteDisk.style.transform = 'rotate(' + this.getMinutesDeg(timerSeconds) + 'deg)';
	}
	private setSecondsStyle(timerSeconds : number) {
		this.secondsDisk.style.transform = 'rotate(' + this.getSecondsDeg(timerSeconds) + 'deg)';
	}
	private setMillisStyle(timerSeconds : number) {
		this.millisDisk.style.transform = 'rotate(' + this.getMillisecondsDeg(timerSeconds) + 'deg)';
	}
	private setStyle(timerSeconds : number) {
		this.setMinutesStyle(timerSeconds);
		this.setSecondsStyle(timerSeconds);
		this.setMillisStyle(timerSeconds);
	}

	private calculateRemainingMinutes() : number {
		return Math.floor(this.timerValue / 6000);
	}
	private calculateRemainingSeconds() : number {
		let m_in_seconds : number = this.timerValue % (60*100);
		return Math.floor(m_in_seconds / 100);
	}
	private calculateRemainingMilliseconds() : number {
		return Math.floor(this.timerValue % (100));
	}
	private setRemainingText() {
		let hourText : string = this.calculateRemainingMinutes().toString();
		if(hourText.length < 2)
			hourText = '0' + hourText;

		let minuteText : string = this.calculateRemainingSeconds().toString();
		if(minuteText.length < 2)
			minuteText = '0' + minuteText;

		let secondText : string = this.calculateRemainingMilliseconds().toString();
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
			/*if(this.timerValue === 0) {
				this.stop();
				this.timerEnd.emit();
			} else {*/
				this.setStyle(this.timerValue += 1);
			//}
			
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
	this.minuteDisk = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'hours')[0];
	this.secondsDisk = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'minutes')[0];
	this.millisDisk = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'seconds')[0];
	this.timeWrite = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.timerElement, 'text')[0];
	this.timerValue = 0;
	this.setRemainingText();
  }

}
