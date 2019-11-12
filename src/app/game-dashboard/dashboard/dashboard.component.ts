import { Component, OnInit } from '@angular/core';
import { User } from 'src/dto/User';
import { Router } from '@angular/router';
import * as AnimaFramework from 'src/assets/animaframework/AnimaFramework.js';
import { LoginService } from 'src/service/user/Login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private logoutBox : HTMLElement;
	private currentViewOpened : HTMLElement = null;
	private mapView : HTMLElement;
	private myTestView : HTMLElement;

	constructor(private router : Router, private loginService : LoginService) { }

	ngOnInit() {
		let user : User = JSON.parse(localStorage.getItem("currentUser"));
		if(typeof user === 'undefined' || user == null) {
			this.router.navigate(['/login']);
		}


		this.logoutBox = document.getElementById('logoutBox');
		this.logoutBox.classList.add('displayNone');

		this.mapView = document.getElementById('mapView');
		this.myTestView = document.getElementById('myTestView');
		this.currentViewOpened = this.mapView;
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


}
