import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user/User.service';
import { Ranking } from 'src/dto/game/Ranking';
import { User } from 'src/dto/User';
import * as AnimaFramework from 'src/assets/animaframework/AnimaFramework.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
	user : User;
	dailyRanking : Ranking[] = new Array();
	weeklyRanking : Ranking[] = new Array();
	levelRanking : Ranking[] = new Array();
	targetRanking : Ranking[] = [];

	targetActive : HTMLElement;


	constructor(private userService : UserService) { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem("currentUser"));
		this.updateDaily(document.getElementById('initialRanking'));
	}

	private makeActive(element : HTMLElement) {
		if(element == null)
			return;
		if(this.targetActive === element) {
			return;
		}
		if(typeof this.targetActive !== 'undefined' && this.targetActive !== null) {
			this.targetActive.classList.remove('active');
		}
		element.classList.add('active');
		this.targetActive = element;
		
	}

	updateDaily(element : HTMLElement) : any {
		this.userService.dailyRanking().subscribe(r => {
			this.dailyRanking = r;
			this.targetRanking = r;
			this.makeActive(element);
			/*this.updateRankingList(this.dailyRanking);*/
		});
	}
	updateWeekly(element : HTMLElement) : any {
		this.userService.weeklyRanking().subscribe(r => {
			this.weeklyRanking = r;
			this.targetRanking = r;
			this.makeActive(element);
			//this.updateRankingList(this.weeklyRanking);
		});
	}
	updateLevel(element : HTMLElement) : any {
		this.userService.levelRanking(this.user.livello).subscribe(r => {
			this.levelRanking = r;
			this.targetRanking = r;
			this.makeActive(element);
			//this.updateRankingList(this.levelRanking);
		});
	}

	/*
	private updateRankingList(list : Ranking[]) {
		this.targetRanking = list;
		let element : HTMLElement = document.body.getElementsByAttributeName('rankingScores')[0];

		while(element.firstChild)
			element.removeChild(element.firstChild);
		
		this.targetRanking.forEach(score => {
			console.log(score);
			element.appendChild(this.createRankingNode(score));
		})
	}

	private createRankingNode(r : Ranking) : any {
		let node = document.createElement("div");
		node.classList.add("rElement");
		let firstSpan = document.createElement("span");
		firstSpan.appendChild(document.createTextNode(r.username.toString()));
		let secondSpan = document.createElement("span");
		secondSpan.appendChild(document.createTextNode(r.score.toString()));

		node.appendChild(firstSpan);
		node.appendChild(secondSpan);

		return node;
	}
	*/
}
