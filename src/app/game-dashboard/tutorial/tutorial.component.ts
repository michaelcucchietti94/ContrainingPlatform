import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TutorialService } from 'src/service/Tutorial.service';
import { Regola } from 'src/dto/game/Regola';
import { DashboardTutorialService } from 'src/service/frontend_scoped/dashboard_tutorial.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  private regoleRepo : Regola[];
  regole: Regola[] = [];
  @Input('typeTiming') charTiming : number = 12;       // Milliseconds
  @Input('ruleTiming') regolaDelay : number = 1000;
  @Output() closeClicked = new EventEmitter();

  private currentTimeouts = [];


  constructor(private tutorialService : TutorialService, private DTService : DashboardTutorialService) { }

  ngOnInit() {
    this.getAll();
    this.DTService.tutorial = this;
  }
  private clearAnimation() {
    this.currentTimeouts.forEach(t => clearTimeout(t));
  }

  doTypingAnimation() {
    this.clearAnimation();
    this.regole = [];
    let timing : number = 0;
    for(let i = 0; i < this.regoleRepo.length; i++) {
      let r = new Regola();
      r.id = this.regoleRepo[i].id;
      r.testo = '';
      this.regole.push(r);

      this.currentTimeouts.push(
        setTimeout((source : Regola, target : Regola) => {
          this.showRegola(source, target);
        }, timing, this.regoleRepo[i], r)
      );

      timing += this.regolaDelay + this.regoleRepo[i].testo.length*this.charTiming;
    }
  }

  private getAll() {
    this.tutorialService.getAll().subscribe(regole => {
      this.regoleRepo = regole;
      this.doTypingAnimation();
    });
  }

  private showRegola(source : Regola, target : Regola) : void {
    let testo : string = source.testo;
    for(let i = 0; i < testo.length; i++) {
      setTimeout(() => {
        target.testo += testo[i];
      }, i*this.charTiming);
    }
  }

  closeClickedAction() {
    this.closeClicked.emit();
  }

  hideCloseButton() {
    let closeButtons : NodeListOf<HTMLElement> = document.getElementsByName('closeButton');
    closeButtons.forEach(b => b.classList.add('displayNone'));
  }


}
