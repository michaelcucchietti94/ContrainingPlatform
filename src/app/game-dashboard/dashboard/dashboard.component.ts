import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/dto/User';
import { Router } from '@angular/router';
import * as AnimaFramework from 'src/assets/animaframework/AnimaFramework.js';
import { LoginService } from 'src/service/user/Login.service';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { DashboardTutorialService } from 'src/service/frontend_scoped/dashboard_tutorial.service';
import { UtilityService, TypingManager } from 'src/service/utility/Utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private decriptionElement : HTMLElement;
	private typingManager : TypingManager;


	constructor(private router : Router, private DTService : DashboardTutorialService, private utility : UtilityService) { }


	profileButtonClick():void {
		this.router.navigate(['/user-dashboard']);
	}

	ngOnInit() {
		this.decriptionElement = document.getElementById('menuEntryDescriptor');
		this.typingManager = this.utility.createTypingManager(this.decriptionElement);
		this.typingManager.typingTimeout=8;

		this.DTService.dashboard = this;
		
	}

	type(element : HTMLElement) {
		let desc : HTMLElement = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(element, 'description')[0];
		
		if(desc == null)
			return;		

		if(this.decriptionElement.classList.contains('displayNone'))
			this.decriptionElement.classList.remove('displayNone');
		this.typingManager.type(desc.innerHTML);
	}
	resetType() {
		this.typingManager.clean();
		
		this.decriptionElement.classList.add('displayNone');

	}

	
  

}
