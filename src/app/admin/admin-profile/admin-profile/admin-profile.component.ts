import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Grafico, Serie, Dato } from '../../layout/grafico';
import { LoginService } from 'src/service/user/Login.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

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
	
	let s : Serie = this.gProva.createSerie('HTML');
    for(let x = 0; x < 6; x++) {
      let d : Dato = s.createDato();
      d.data = x;
      s.addDato(d);
    }

    let s1 : Serie = this.gProva.createSerie('Java');
    for(let x = 0; x < 6; x++) {
      let d : Dato = s1.createDato();
      d.data = Math.random()*3+3;
      s1.addDato(d);
    }
    
    let s2 : Serie = this.gProva.createSerie('PHP');
    for(let x = 0; x < 6; x++) {
      let d : Dato = s2.createDato();
      d.data = Math.random()*4+2;
      s2.addDato(d);
    }

	this.provaDataset = this.gProva.createDataset();
	this.provaLabels = this.gProva.getXAxis();

    this.logoutBox = document.getElementById('logoutBox');
    this.logoutBox.classList.add('displayNone');
  }

}
