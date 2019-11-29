import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../service/user/Login.service';
import { Grafico, Serie, Dato } from 'src/app/admin/layout/grafico';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  @Output() logout = new EventEmitter();
  private logoutBox : HTMLElement;
  gProva : Grafico;
  provaDataset : Array<any> = [];
  provaLabels : Array<any> = [];

  constructor(private loginService : LoginService) { 
	

  }

  ngOnInit() {
	this.gProva = new Grafico();
	this.gProva.addXValue('0');
	this.gProva.addXValue('1');
	this.gProva.addXValue('2');
	this.gProva.addXValue('3');
	this.gProva.addXValue('4');
	this.gProva.addXValue('5');
	
	let s : Serie = this.gProva.createSerie('Dured');
	for(let x = 0; x < 6; x++) {
		let d : Dato = s.createDato();
		d.data = x;
		s.addDato(d);
	}

	this.provaDataset = this.gProva.createDataset();
	this.provaLabels = this.gProva.getXAxis();

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
