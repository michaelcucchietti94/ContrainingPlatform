import { Component, OnInit, Input } from '@angular/core';
import { Grafico } from 'src/app/admin/layout/grafico';

@Component({
  selector: 'app-chartline',
  templateUrl: './chartline.component.html',
  styleUrls: ['./chartline.component.css']
})
export class ChartlineComponent implements OnInit {

  public chartType: string = 'line';

  @Input() chartDatasets: Array<any> = [
  ];

  @Input() chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 197, 194, .2)',
      borderColor: 'rgba(72, 255, 251, .8)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 197, 194, .2)',
      borderColor: 'rgba(72, 255, 251, .8)',
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
