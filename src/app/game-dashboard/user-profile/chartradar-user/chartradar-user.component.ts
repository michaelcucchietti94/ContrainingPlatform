import { Component, OnInit, Input } from '@angular/core';
import { Grafico } from 'src/app/admin/layout/grafico';


@Component({
  selector: 'app-chartradar-user',
  templateUrl: './chartradar-user.component.html',
  styleUrls: ['./chartradar-user.component.css']
})
export class ChartradarUserComponent implements OnInit {

  public chartType: string = 'radar';

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
      backgroundColor: 'rgba(100, 197, 194, .2)',
      borderColor: 'rgba(172, 150, 251, .8)',
      borderWidth: 2,
    },

    {
      backgroundColor: 'rgba(150, 297, 94, .2)',
      borderColor: 'rgba(12, 250, 51, .8)',
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
