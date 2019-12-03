import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  isUserCollapsed = false;
  isTestCollapsed = false;


  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  userscollapse() {
    if (this.isUserCollapsed === false) {
      this.isUserCollapsed = true;
    } else { this.isUserCollapsed = false; }
  }

  testscollapse() {
    if (this.isTestCollapsed === false) {
      this.isTestCollapsed = true;
    } else { this.isTestCollapsed = false; }
  }

}
