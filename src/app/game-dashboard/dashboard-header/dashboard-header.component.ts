import { Component, OnInit } from '@angular/core';
import { User } from 'src/dto/User';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  user : User;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

}
