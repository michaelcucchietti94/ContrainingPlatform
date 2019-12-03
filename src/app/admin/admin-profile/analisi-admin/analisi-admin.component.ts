import { Component, OnInit } from '@angular/core';
import { Grafico, Serie, Dato } from '../../layout/grafico';

@Component({
  selector: 'app-analisi-admin',
  templateUrl: './analisi-admin.component.html',
  styleUrls: ['./analisi-admin.component.css']
})
export class AnalisiAdminComponent implements OnInit {

  
  barProva : Grafico;
  hbarProva : Grafico;
  radarProva : Grafico;
  lineProva : Grafico;

  barProvaDataset : Array<any> = [];
  barProvaLabels : Array<any> = [];
  hbarProvaDataset : Array<any> = [];
  hbarProvaLabels : Array<any> = [];
  radarProvaDataset : Array<any> = [];
  radarProvaLabels : Array<any> = [];
  lineProvaDataset : Array<any> = [];
  lineProvaLabels : Array<any> = [];

  constructor() { }

  private initCharts() {
    this.barProva = new Grafico();
    this.hbarProva = new Grafico();
    this.radarProva = new Grafico();
    this.lineProva = new Grafico();

    for(let i = 0; i < 6; i++) {
      this.barProva.addXValue(i.toString());
      this.hbarProva.addXValue(i.toString());
      this.radarProva.addXValue(i.toString());
      this.lineProva.addXValue(i.toString());
      
    }
  }

  private createSeries(g : Grafico) {
    let s : Serie = g.createSerie('HTML');
    for(let x = 0; x < 6; x++) {
      let d : Dato = s.createDato();
      d.data = x;
      s.addDato(d);
    }

    let s1 : Serie = g.createSerie('Java');
    for(let x = 0; x < 6; x++) {
      let d : Dato = s1.createDato();
      d.data = Math.random()*3+3;
      s1.addDato(d);
    }
  }

  ngOnInit() {
    this.initCharts();
    this.createSeries(this.barProva);
    this.createSeries(this.hbarProva);
    this.createSeries(this.radarProva);
    this.createSeries(this.lineProva);
    
    
  
    this.barProvaDataset = this.barProva.createDataset();
    this.barProvaLabels = this.barProva.getXAxis();
    this.hbarProvaDataset = this.hbarProva.createDataset();
    this.hbarProvaLabels = this.hbarProva.getXAxis();
    this.radarProvaDataset = this.radarProva.createDataset();
    this.radarProvaLabels = this.radarProva.getXAxis();
    this.lineProvaDataset = this.lineProva.createDataset();
    this.lineProvaLabels = this.lineProva.getXAxis();
  }

}
