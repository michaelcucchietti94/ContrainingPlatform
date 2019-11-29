import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Grafico, Serie, Dato } from 'src/app/admin/layout/grafico';
import { LoginService } from 'src/service/user/Login.service';
import { UtilityService } from 'src/service/utility/Utility.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private clicked : boolean = false;

  @Output() logout = new EventEmitter();
  private logoutBox : HTMLElement;
  gProva : Grafico;
  provaDataset : Array<any> = [];
  provaLabels : Array<any> = [];

  constructor(private utility : UtilityService) {
  }
  
  ngOnInit() {this.gProva = new Grafico();
    this.gProva.addXValue('CSS');
    this.gProva.addXValue('Java');
    this.gProva.addXValue('SQL');
    this.gProva.addXValue('Angular');
    this.gProva.addXValue('HTML');
    this.gProva.addXValue('PHP');
    
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
  
    }
  
}


