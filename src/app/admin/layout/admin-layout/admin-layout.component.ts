import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../service/user/Login.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  @Output() logout = new EventEmitter();
  private logoutBox : HTMLElement;

  constructor(private loginService : LoginService) { }

  ngOnInit() {

    this.logoutBox = document.getElementById('logoutBox');
    this.logoutBox.classList.add('displayNone');
  }

  logoutEvent(e) {
    this.logout.emit(e);
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
