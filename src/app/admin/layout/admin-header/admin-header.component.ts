import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/dto/User';
import { LoginService } from 'src/service/user/Login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  user : User;
  @Output() logout = new EventEmitter();

  constructor(private loginService : LoginService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  logoutEvent(e) {
    this.logout.emit(e);
  }
}

