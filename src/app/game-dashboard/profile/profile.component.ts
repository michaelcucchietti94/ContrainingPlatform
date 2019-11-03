import { Component, OnInit } from '@angular/core';
import { User } from 'src/dto/User';
import { TestService } from 'src/service/test/Test.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user : User;
	testCount : Number;
	testCount_l1 : Number;
	testCount_l2 : Number;
	testCount_l3 : Number;

	countTestUser : Number;
	countTestUser_l1 : Number;
	countTestUser_l2 : Number;
	countTestUser_l3 : Number;


	constructor(private testService : TestService) { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem("currentUser"));
		this.testService.countTest().subscribe((n) => this.testCount = n);
		this.testService.countLevelTest(1).subscribe(n => this.testCount_l1 = n);
		this.testService.countLevelTest(2).subscribe(n => this.testCount_l2 = n);
		this.testService.countLevelTest(3).subscribe(n => this.testCount_l3 = n);
		this.testService.countTestCompletedBy(this.user.username.toString()).subscribe((n) => this.countTestUser = n);
		this.testService.countLevelTestCompletedBy(this.user.username.toString(), 1).subscribe((n) => this.countTestUser_l1 = n);
		this.testService.countLevelTestCompletedBy(this.user.username.toString(), 2).subscribe((n) => this.countTestUser_l2 = n);
		this.testService.countLevelTestCompletedBy(this.user.username.toString(), 3).subscribe((n) => this.countTestUser_l3 = n);
	}
}
