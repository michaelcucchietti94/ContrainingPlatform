import { Component, OnInit } from '@angular/core';
import { User } from 'src/dto/User';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/user/Login.service';

@Component({
  selector: 'app-main-user-layout',
  templateUrl: './main-user-layout.component.html',
  styleUrls: ['./main-user-layout.component.css']
})
export class MainUserLayoutComponent implements OnInit {

  private logoutBox : HTMLElement;
  
  constructor(private router : Router, private loginService : LoginService) { }

  ngOnInit() {
		let user : User = JSON.parse(localStorage.getItem("currentUser"));
		if(typeof user === 'undefined' || user == null) {
			this.router.navigate(['/login']);
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
