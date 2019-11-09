import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/dto/User';
import { Router } from '@angular/router';
import * as AnimaFramework from 'src/assets/animaframework/AnimaFramework.js';
import { LoginService } from 'src/service/user/Login.service';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { DashboardTutorialService } from 'src/service/frontend_scoped/dashboard_tutorial.service';

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


	constructor(private router : Router, private loginService : LoginService, private DTService : DashboardTutorialService) { }

	ngOnInit() {
		let user : User = JSON.parse(localStorage.getItem("currentUser"));
		if(typeof user === 'undefined' || user == null) {
			this.router.navigate(['/login']);
		}
		if(user.usertype.toString().toLowerCase() !== 'user') {
			alert('wrong usertype. See Game Dashboard init');
		}

		this.logoutBox = document.getElementById('logoutBox');
		this.logoutBox.classList.add('displayNone');

		this.mapView = document.getElementById('mapView');
		this.myTestView = document.getElementById('myTestView');
		this.tutorialView = document.getElementById('tutorialView');
		this.currentViewOpened = this.mapView;

		this.DTService.dashboard = this;
		this.displayFirstTimeTutorial();
	}

	displayFirstTimeTutorial() {
		let user : User = JSON.parse(localStorage.getItem("currentUser"));
		console.log(user);
		if(user.firstAccess) {
			let tutorialFirst = document.getElementById('tutorialBox_first');
			let dashboard = document.getElementById('dashboardContainer');

			tutorialFirst.classList.add('displayFlex');
			dashboard.classList.add('displayNone');
		}
	}
	hideFirstTimeTutorial() {
		let tutorialFirst = document.getElementById('tutorialBox_first');
		let dashboard = document.getElementById('dashboardContainer');

		tutorialFirst.classList.remove('displayFlex');
		dashboard.classList.remove('displayNone');
	}

	setAccessed() {
		let user : User = JSON.parse(localStorage.getItem("currentUser"));
		this.loginService.setAccessed(user.username.toString()).subscribe(() => {
			this.hideFirstTimeTutorial();
		});

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
  

}
