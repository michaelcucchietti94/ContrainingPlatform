import { Component, OnInit, Input } from '@angular/core';
import { Grafico } from 'src/app/admin/layout/grafico';

@Component({
  selector: 'app-chartradar',
  templateUrl: './chartradar.component.html',
  styleUrls: ['./chartradar.component.css']
})
export class ChartradarComponent implements OnInit {
  
  public chartType: string = 'radar';

  @Input() chartDatasets: Array<any> = [
  ];

  @Input() chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 250, 220, .2)',
      borderColor: 'rgba(0, 213, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor() { }

  ngOnInit() {

  }

}
