import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TestService } from 'src/service/test/Test.service';
import { User } from 'src/dto/User';
import { Observable } from 'rxjs';
import { DomandaDecorated } from 'src/dto/testing/DomandaDecorated';
import { UserTestScore } from 'src/dto/testing/UserTestScore';
import { UtilityService } from 'src/service/utility/Utility.service';
import { ViewportScroller } from '@angular/common';
import { RispostaDomanda } from 'src/dto/testing/RispostaDomanda';
import { MapTestService } from 'src/service/frontend_scoped/map_test.service';
import { Router } from '@angular/router';
import { RispostaUtente } from 'src/dto/testing/RispostaUtente';

@Component({
  selector: 'app-usertest',
  templateUrl: './usertest.component.html',
  styleUrls: ['./usertest.component.css']
})
export class UsertestComponent implements OnInit {
	@Output('start') startEvent = new EventEmitter();
	domanda : DomandaDecorated = new DomandaDecorated();
	private user : User;
	private isAddingResponse : boolean = false;
	private isAboutReadingQuestion : boolean = true;
	private isAboutEnding : boolean = false;

	rispostaDomanda : RispostaDomanda = new RispostaDomanda();
	argomento : string = "";
	private headerRow : HTMLElement;
	private slider : HTMLElement;
	private animationName : string = "A_12";


	constructor(private utilityService : UtilityService, private testService : TestService, private mapTest : MapTestService, private router : Router) { }

	ngOnInit() {
		let  user : User = JSON.parse(localStorage.getItem("currentUser"));
		this.user = user;
		this.argomento = this.mapTest.getArgomento();
		this.headerRow = document.getElementById('headerRow');
		this.slider = document.getElementById('testSlider');


		this.testService.startTest(user.username.toString(), this.mapTest.getArgomento(), this.mapTest.getLevel()).subscribe(() => {
			/*this.testService.hasMoreQuestion(this.user.username.toString()).subscribe(more => {
				if(more) {
					this.isAboutEnding = false;
					this.isAboutReadingQuestion = true;
					this.isAddingResponse = false;
				} else {
					this.isAboutEnding = true;
					this.isAboutReadingQuestion = false;
					this.isAddingResponse = false;
				}
				this.showStart();
			})*/
			this.showStart();
		});
	}

	startButtonClick() : void {
		this.animationName = "A_12";
		this.testService.getNextQuestion(this.user.username.toString()).subscribe(question => {
			this.domanda = question;
			this.isAboutReadingQuestion = false;
			this.isAboutEnding = false;
			this.isAddingResponse = true;
			this.showQuestion();
		});
	}
	buttonClick() : void {
		if(!this.isAddingResponse) {
			// Il pulsante andrà a recuperare una domanda oppure terminerà il test;
			if(this.isAboutReadingQuestion) {
				this.testService.getNextQuestion(this.user.username.toString()).subscribe(question => {
					this.domanda = question;
					this.isAboutReadingQuestion = false;
					this.isAboutEnding = false;
					this.isAddingResponse = true;
					this.animationName = "A_32";
					this.showQuestion();
				});
			} else if(this.isAboutEnding) {
				this.testService.endTest(this.user.username.toString()).subscribe(score => {
					this.isAboutEnding = false;
					this.isAboutReadingQuestion = true;
					this.isAddingResponse = false;
					this.mapTest.setScore(score);
				
					this.mapTest.doAction().subscribe(() => {
						this.router.navigate(['/dashboard/map']);
					});
				});
			}
		} else {
			let rispostaUtente : RispostaUtente = new RispostaUtente();
			rispostaUtente.risposta = this.rispostaDomanda;
			rispostaUtente.user = this.user;

			this.testService.addResponse(rispostaUtente).subscribe(() => {
				this.testService.hasMoreQuestion(this.user.username.toString()).subscribe(more => {
					if(more) {
						this.isAboutEnding = false;
						this.isAddingResponse = false;
						this.isAboutReadingQuestion = true;
					} else {
						this.isAboutReadingQuestion = false,
						this.isAddingResponse = false;
						this.isAboutEnding = true;
					}
					this.animationName = "A_23";
					this.showExplanation();
				})
			})
		}
	}

	changeRisposta(index : number) {
		this.rispostaDomanda = this.domanda.risposte[index];
	}

	start() {
		this.startEvent.emit();
	}

	private clearAnimations() {
		this.slider.className = "slider animable";
	}

	showStart() {

	}
	
	showQuestion() {
		this.headerRow.classList.remove('displayNone');
		this.clearAnimations();
		this.slider.classList.add(this.animationName);
	}
	showExplanation() {
		this.clearAnimations();
		this.slider.classList.add(this.animationName);
	}

}

