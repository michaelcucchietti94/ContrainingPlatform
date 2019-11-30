import { Component, OnInit, Directive, Input, ElementRef } from '@angular/core';
import { Continente } from 'src/dto/game/Continente';
import { GamemapService } from 'src/service/map/Gamemap.service';
import { Observable } from 'rxjs';
import { ContinentePiece } from 'src/dto/game/ContinentPiece';
import { StatoDecorated } from 'src/dto/game/StatoDecorated';
import { RequestState } from 'src/dto/game/RequestState';
import { User } from 'src/dto/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	private mapCSS: MapCss;
	private mapNavigatorElements : HTMLElement;

	constructor(private service : GamemapService, private router : Router) {
	}

	createRange(n : number) : Array<number> {
		let a : Array<number> = [];
		for(let x = 1; x <= n; x++) {
			a.push(x);
		}
		return a;
	}

	ngOnInit() {
		this.mapNavigatorElements = document.getElementById('mapElements');
		this.mapCSS = new MapCss();
		this.mapCSS.resetMap();

	}
	
	
	overElement(target : HTMLElement)  {
		let tID : number;
		try {
			tID = parseInt(target.innerText);
			this.mapCSS.updateMap(tID);
		} catch(e) {
			this.mapCSS.resetMap();
		}		
	}
	leaveElement() {
		this.mapCSS.resetMap();
	}

}

class MapCss {
	private mapElement : HTMLElement;
	constructor() {
		this.mapElement = document.getElementById('contrainingMap');
	}

	resetMap() {
		this.mapElement.className = '';
		this.mapElement.classList.add('map');
		let className : string = 'continente'
		this.mapElement.classList.add(className);
	}
	updateMap(continentID : number) {
		this.mapElement.className = '';
		this.mapElement.classList.add('map');
		let className : string = 'continente_' + continentID;
		this.mapElement.classList.add(className);
	}
}

