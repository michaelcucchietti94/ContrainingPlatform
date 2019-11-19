import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/service/utility/Utility.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

	constructor(private utility : UtilityService) {
		
	}

	ngOnInit() {
	}

}