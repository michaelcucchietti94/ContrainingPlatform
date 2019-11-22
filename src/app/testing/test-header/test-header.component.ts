import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/dto/User';
import { LoginService } from 'src/service/user/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-header',
  templateUrl: './test-header.component.html',
  styleUrls: ['./test-header.component.css']
})
export class TestHeaderComponent implements OnInit {
  user : User;
  @Output() logout = new EventEmitter();

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  logoutEvent(e) {
    this.logout.emit(e);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
