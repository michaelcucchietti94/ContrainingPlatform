import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/service/utility/Utility.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private utility : UtilityService) { }

  ngOnInit() {
    
  }

  inputMouseHover(elem : HTMLElement) : void {
    this.utility.animationFactory.AnimationLeft(elem, 1, 'linear', '30vh').start();
  }

}
