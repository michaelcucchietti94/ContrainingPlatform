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

constructor(private router : Router, private loginService : LoginService) { }

  ngOnInit() {
    let user: User = JSON.parse(localStorage.getItem("currentUser"));
		  if (typeof user === 'undefined' || user == null) {
			  this.router.navigate(['/login']);
      }

  }



}

