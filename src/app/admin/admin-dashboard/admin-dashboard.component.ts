import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/user/Login.service';
import { User } from 'src/dto/User';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  private logoutBox : HTMLElement;


	constructor(private router : Router, private loginService : LoginService) { }

  ngOnInit() {
    let user : User = JSON.parse(localStorage.getItem("currentUser"));
		if(typeof user === 'undefined' || user == null) {
			this.router.navigate(['/login']);
		}
		if(user.usertype.toString().toLowerCase() !== 'admin') {
			alert('wrong usertype. See Game Dashboard init');
    }

    this.logoutBox = document.getElementById('logoutBox');
		this.logoutBox.classList.add('displayNone');

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


}

