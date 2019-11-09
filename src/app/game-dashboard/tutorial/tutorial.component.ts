import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TutorialService } from 'src/service/Tutorial.service';
import { Regola } from 'src/dto/game/Regola';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  private regoleRepo : Regola[];
  regole: Regola[] = [];
  private charTiming : number = 12;       // Milliseconds
  private regolaDelay : number = 1000;
  @Output() closeClicked = new EventEmitter();


  constructor(private tutorialService : TutorialService) { }

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.tutorialService.getAll().subscribe(regole => {
      this.regoleRepo = regole;
      let timing : number = 0;
      for(let i = 0; i < this.regoleRepo.length; i++) {
        let r = new Regola();
        r.id = this.regoleRepo[i].id;
        r.testo = '';
        console.log('Creating rule with id ' + r.id);
        this.regole.push(r);

        setTimeout((source : Regola, target : Regola) => {
          console.log('Showing rule (' + source.id + ')');
          this.showRegola(source, target);
        }, timing, this.regoleRepo[i], r);
        timing += this.regolaDelay + this.regoleRepo[i].testo.length*this.charTiming;
      }
    });
  }

  private showRegola(source : Regola, target : Regola) : void {
    let testo : string = source.testo;
    for(let i = 0; i < testo.length; i++) {
      setTimeout(() => {
        target.testo += testo[i];
        console.log(target.testo);
      }, i*this.charTiming);
    }
  }

  closeClickedAction() {
    this.closeClicked.emit();
  }


}
