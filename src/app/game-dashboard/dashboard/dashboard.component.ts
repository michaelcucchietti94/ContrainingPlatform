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

	private logoutBox : HTMLElement;
	private currentViewOpened : HTMLElement = null;
	private mapView : HTMLElement;
	private tutorialView : HTMLElement;
	private myTestView : HTMLElement;
	private decriptionElement : HTMLElement;
	private typingManager : TypingManager;


	constructor(private router : Router, private loginService : LoginService, private DTService : DashboardTutorialService, private utility : UtilityService) { }

	ngOnInit() {
		let user : User = JSON.parse(localStorage.getItem("currentUser"));
		if(typeof user === 'undefined' || user == null) {
			this.router.navigate(['/login']);
		}

		this.decriptionElement = document.getElementById('menuEntryDescriptor');
		this.typingManager = this.utility.createTypingManager(this.decriptionElement);
		this.typingManager.typingTimeout=8;

		this.logoutBox = document.getElementById('logoutBox');
		this.logoutBox.classList.add('displayNone');

		this.mapView = document.getElementById('mapView');
		this.myTestView = document.getElementById('myTestView');
		this.tutorialView = document.getElementById('tutorialView');
		this.currentViewOpened = this.mapView;

		this.DTService.dashboard = this;
		
	}

	showLogoutBox() {
		this.logoutBox.classList.remove('displayNone');
		this.logoutBox.classList.add('displayFlex');
	}
	hideLogoutBox() {
		this.logoutBox.classList.remove('displayFlex');
		this.logoutBox.classList.add('displayNone');
	}

	confirmLogout() {
		this.hideLogoutBox();
		this.loginService.logout();
	}
	cancelLogout() {
		this.hideLogoutBox();
	}

	private hideCurrentView() {
		if(this.currentViewOpened != null)
			this.currentViewOpened.classList.add('displayNone');
	}
	private showView(e : HTMLElement) {
		e.classList.remove('displayNone');
		this.currentViewOpened = e;
	}
	showMyTest() {
		if(this.currentViewOpened !== this.myTestView) {
			this.hideCurrentView();
			this.showView(this.myTestView);
		}
	}
	showMap() {
		if(this.currentViewOpened !== this.mapView) {
			this.hideCurrentView();
			this.showView(this.mapView);
		}
	}
	showTutorial() {
		if(this.currentViewOpened !== this.tutorialView) {
			this.DTService.hideTutorialCloseButton();
			this.DTService.startTutorialAnimation();
			this.hideCurrentView();
			this.showView(this.tutorialView);
		}
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
