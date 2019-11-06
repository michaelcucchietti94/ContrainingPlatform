import { Component, OnInit } from '@angular/core';
import { Test } from 'src/dto/testing/Test';
import { TestService } from 'src/service/test/Test.service';
import { User } from 'src/dto/User';

@Component({
	selector: 'app-mytest',
	templateUrl: './mytest.component.html',
	styleUrls: ['./mytest.component.css']
})
export class MytestComponent implements OnInit {
	private setTestElement : HTMLElement;
	private filterLevelElement : HTMLElement;
	private setOfTestRegistry : ActiveRegister;
	private filterLevelRegistry : ActiveRegister;
	tests : Test[] = [];
	private serviceAdapter : ServiceAdapter;

	constructor(private testGameService : TestService) { 
	}

	ngOnInit() {
		this.setTestElement = document.getElementById('setOfTests');
		this.filterLevelElement = document.getElementById('filterLevel');

		this.setOfTestRegistry = new ActiveRegister(this.setTestElement);
		this.filterLevelRegistry = new ActiveRegister(this.filterLevelElement);

		
		this.serviceAdapter = new ServiceAdapter(this.testGameService);
		this.serviceAdapter.fill(this.tests);
	}

	selectSet(e : HTMLElement, set : number) {
		this.setOfTestRegistry.setActive(e);
		this.serviceAdapter.testSet = set;
		this.serviceAdapter.fill(this.tests);
	}

	selectFilterLevel(e : HTMLElement, filter : number) {
		this.filterLevelRegistry.setActive(e);
		this.serviceAdapter.testLevelFilter = filter;
		this.serviceAdapter.fill(this.tests);
	}

}

enum TestSet {
	Completati, NonCompletati
}
enum TestLevelFilter {
	All, One, Two, Three
}

class ServiceAdapter {
	testSet : TestSet;
	testLevelFilter : TestLevelFilter;
	private user : User;

	constructor(private service : TestService) {
		this.testSet = TestSet.Completati;
		this.testLevelFilter = TestLevelFilter.All;
		this.user = JSON.parse(localStorage.getItem("currentUser"));
	}

	fill(targetList : Test[]) {
		if(this.testSet === TestSet.Completati) {
			if(this.testLevelFilter === TestLevelFilter.All) {
				this.fillCompletatiAll(targetList);
			}
			else if(this.testLevelFilter === TestLevelFilter.One) {
				this.fillCompletatiOne(targetList);
			}
			else if(this.testLevelFilter === TestLevelFilter.Two) {
				this.fillCompletatiTwo(targetList);
			}
			else if(this.testLevelFilter === TestLevelFilter.Three) {
				this.fillCompletatiThree(targetList);
			}
		} else if (this.testSet === TestSet.NonCompletati) {
			if(this.testLevelFilter === TestLevelFilter.All) {
				this.fillNonCompletatiAll(targetList);
			}
			else if(this.testLevelFilter === TestLevelFilter.One) {
				this.fillNonCompletatiOne(targetList);
			}
			else if(this.testLevelFilter === TestLevelFilter.Two) {
				this.fillNonCompletatiTwo(targetList);
			}
			else if(this.testLevelFilter === TestLevelFilter.Three) {
				this.fillNonCompletatiThree(targetList);
			}
		}
	}
	private switchList(target : Test[], source : Test[]) {
		target.splice(0, target.length);
		source.forEach(e => target.push(e));
	}
	private fillCompletatiAll(targetList : Test[]) {
		this.service.getTestCompletedBy(this.user.username.toString()).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}
	private fillCompletatiOne(targetList : Test[]) {
		this.service.getLevelTestCompletedBy(this.user.username.toString(), 1).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}
	private fillCompletatiTwo(targetList : Test[]) {
		this.service.getLevelTestCompletedBy(this.user.username.toString(), 2).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}
	private fillCompletatiThree(targetList : Test[]) {
		this.service.getLevelTestCompletedBy(this.user.username.toString(), 3).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}
	private fillNonCompletatiAll(targetList : Test[]) {
		this.service.getTestNotCompletedBy(this.user.username.toString()).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}
	private fillNonCompletatiOne(targetList : Test[]) {
		this.service.getLevelTestNotCompletedBy(this.user.username.toString(), 1).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}
	private fillNonCompletatiTwo(targetList : Test[]) {
		this.service.getLevelTestNotCompletedBy(this.user.username.toString(), 2).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}
	private fillNonCompletatiThree(targetList : Test[]) {
		this.service.getLevelTestNotCompletedBy(this.user.username.toString(), 3).subscribe(tests => {
			this.switchList(targetList, tests);
		})
	}

}

class ActiveRegister {
	private refElement : HTMLElement;
	private aTags : HTMLElement[];
	
	constructor(private element : HTMLElement) {
		this.refElement = element;
		this.aTags = [];
		let tags = this.refElement.getElementsByTagName('a');
		for(let i = 0; i < tags.length; i++) {
			this.aTags.push(tags.item(i));
		}
	}

	private removeActiveFromCurrent() {
		for(let a of this.aTags) {
			if(a.classList.contains('active'))
				a.classList.remove('active');
		}
	}
	setActive(element : HTMLElement) {
		this.removeActiveFromCurrent();
		if(!element.classList.contains('active'))
			element.classList.add('active');
	}
}