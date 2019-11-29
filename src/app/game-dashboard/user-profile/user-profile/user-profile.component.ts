import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/service/utility/Utility.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private clicked : boolean = false;

  constructor(private utility : UtilityService) { }

  ngOnInit() {
    
  }

  cevent(elem : HTMLElement) : void {
    if(!this.clicked) {
      this.utility.animationFactory.AnimationLeft(elem, 1, this.utility.animationCurves.exponential, '30vh').start();
    } else {
      let an = this.utility.animationFactory.AnimationLeft(elem, 1.5, this.utility.animationCurves.exponentialsincos, '0vh');
      an.start();
    }

    this.clicked = !this.clicked;
  }



}
