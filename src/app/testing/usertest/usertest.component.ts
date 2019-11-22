import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TestService } from 'src/service/test/Test.service';
import { User } from 'src/dto/User';
import { Observable } from 'rxjs';
import { DomandaDecorated } from 'src/dto/testing/DomandaDecorated';
import { UserTestScore } from 'src/dto/testing/UserTestScore';
import { UtilityService } from 'src/service/utility/Utility.service';
import { ViewportScroller } from '@angular/common';
import { RispostaDomanda } from 'src/dto/testing/RispostaDomanda';

@Component({
  selector: 'app-usertest',
  templateUrl: './usertest.component.html',
  styleUrls: ['./usertest.component.css']
})
export class UsertestComponent implements OnInit {
	manager : PageManager;
	@Output('start') startEvent = new EventEmitter();

	constructor(private utilityService : UtilityService, private testService : TestService) { }

	ngOnInit() {
		this.manager = new PageManager(this.utilityService, this.testService, this);
	}

	buttonClick() : void {
		this.manager.callAction();
	}

	start() {
		this.startEvent.emit();
	}

}

class PageManager {
	private slider : HTMLElement;
	private functionMap : Map<PageFunctionType, PageManagerCall> = new Map();
	private animations : Animations;
	private tester : HTMLElement;
	private nextButton : HTMLElement;
	private counter : number = 1;

	private usertestComponent : UsertestComponent;

	private startAction: StartAction;
	private getNQAction : NextQuestionAction;
	private addResponseAction : AddResponseAction;
	private endTestAction: EndTestAction;
	private hasMoreQuestion: HasMoreQuestionAction;
	private actionToCall : PageFunctionType;

	risposta : RispostaDomanda;

	
	constructor(private utilityService : UtilityService, private testService : TestService, ut : UsertestComponent) {
		this.usertestComponent = ut;

		this.slider = document.getElementById('testSlider');
		this.animations = new Animations(this.slider);
		this.tester = <HTMLElement>this.utilityService.extendedDocument.getElementsByAttributeNameOf(this.slider, "tester")[0];

		this.startAction = new StartAction(this.testService, 1);
		this.getNQAction = new NextQuestionAction(this.testService);
		this.addResponseAction = new AddResponseAction(this.testService);
		this.endTestAction = new EndTestAction(this.testService);
		this.hasMoreQuestion = new HasMoreQuestionAction(this.testService);

		this.functionMap.set(PageFunctionType.START, new StartCall(this));
		this.functionMap.set(PageFunctionType.NEXTQUESTION, new NextQuestionCall(this));
		this.functionMap.set(PageFunctionType.ADDRESPONSE, new AddResponseCall(this));
		this.functionMap.set(PageFunctionType.ENDTEST, new EndTestCall(this));

		this.actionToCall = PageFunctionType.START;
		this.hideButton();
	}

	private hideButton() : void {
		document.getElementById('testControlButton').classList.add("displayNone");
	}
	private showButton() : void {
		document.getElementById('testControlButton').classList.remove("displayNone");
	}

	callAction() : void {
		this.functionMap.get(this.actionToCall).call();
	}

	startFunction() : void {
		this.animations.animate(AnimationType.A12);
		this.showButton();
		this.usertestComponent.start();
		this.actionToCall = PageFunctionType.ADDRESPONSE;
		
		/*this.startAction.doAction().subscribe(() => {
			this.getNQAction.doAction().subscribe((domanda) => {
				let testo : string = domanda.testo.toString();
				testo += '<br />';
				domanda.risposte.forEach((r) => {
					testo += r.testo + '<br />';
				})

				this.tester.innerHTML = testo;
				this.actionToCall = PageFunctionType.ADDRESPONSE;
			});
		})*/

		
	}
	ARFunction() : void {
		this.animations.animate(AnimationType.A23);
		if(this.counter > 0) {
			this.actionToCall = PageFunctionType.NEXTQUESTION
			this.counter--;
		} else {
			this.actionToCall = PageFunctionType.ENDTEST
		}

		/*this.addResponseAction.doAction().subscribe(() => {
			this.hasMoreQuestion.doAction().subscribe(more => {
				if(more) {
					this.actionToCall = PageFunctionType.NEXTQUESTION
				} else {
					this.actionToCall = PageFunctionType.ENDTEST
				}
			})
		});*/
		
		
	}
	NQFunction() : void {
		this.animations.animate(AnimationType.A32);
		this.actionToCall = PageFunctionType.ADDRESPONSE;
		/*this.getNQAction.doAction().subscribe((domanda) => {
			this.tester.innerHTML = domanda.id.toString();
			this.actionToCall = PageFunctionType.ADDRESPONSE;
		});*/
	}
	endTestFunction() : void {
		this.animations.animate(AnimationType.A34);
		/*this.endTestAction.doAction();*/
	}
}

abstract class PageManagerCall {
	protected manager : PageManager;

	constructor(manager : PageManager) {
		this.manager = manager;
	}

	abstract call() : void;
}
class StartCall extends PageManagerCall {
	call(): void {
		this.manager.startFunction();
	}
}
class NextQuestionCall extends PageManagerCall {
	call(): void {
		this.manager.NQFunction();
	}
}
class AddResponseCall extends PageManagerCall {
	call(): void {
		this.manager.ARFunction();
	}
}
class EndTestCall extends PageManagerCall {
	call(): void {
		this.manager.endTestFunction();
	}
}


enum PageFunctionType {
	START, NEXTQUESTION, ADDRESPONSE, ENDTEST
}

abstract class TestAction<Result> {
	protected user : User;
	constructor(protected testService : TestService) {
		this.user = JSON.parse(localStorage.getItem("currentUser"));
	}
	abstract doAction() : Result;
}
class HasMoreQuestionAction extends TestAction<Observable<Boolean>> {
	doAction(): Observable<Boolean> {
		return this.testService.hasMoreQuestion(this.user.username.toString());
	}
	
}
class StartAction extends TestAction<any> {
	private idTest : number;

	constructor(protected testService : TestService, idTest : number) {
		super(testService);
		this.idTest = idTest;
	}

	doAction(): any {
		return this.testService.startTest(this.user.username.toString(), this.idTest);
	}
}
class AddResponseAction extends TestAction<any> {

	doAction(): any {
		//return this.testService.addResponse();
	}
}
class NextQuestionAction extends TestAction<Observable<DomandaDecorated>> {

	doAction(): Observable<DomandaDecorated> {
		return this.testService.getNextQuestion(this.user.username.toString());
	}
}
class EndTestAction extends TestAction<Observable<UserTestScore>> {

	doAction(): Observable<UserTestScore> {
		return this.testService.endTest(this.user.username.toString());
	}
}


class Animations {
	private animations : Map<AnimationType, AnimationState> = new Map<AnimationType, AnimationState>();
	private currentType : AnimationType = null;

	constructor(target : HTMLElement) {
		this.animations.set(AnimationType.A12, new AnimationState("A_12", target));
		this.animations.set(AnimationType.A23, new AnimationState("A_23", target));
		this.animations.set(AnimationType.A32, new AnimationState("A_32", target));
		this.animations.set(AnimationType.A34, new AnimationState("A_34", target));
	}

	animate(type : AnimationType) {
		if(this.currentType != null)
			this.animations.get(this.currentType).stop();
		this.currentType = type;
		this.animations.get(this.currentType).animate();
	}
}
enum AnimationType {
	A12, A23, A32, A34
}
class AnimationState {
	private animationName : string;
	private target : HTMLElement;

	constructor(animationName : string, target : HTMLElement) {
		this.animationName = animationName;
		this.target = target;
	}

	animate() : void {
		this.target.classList.add(this.animationName);
	}
	stop() : void {
		this.target.classList.remove(this.animationName);
	}
}