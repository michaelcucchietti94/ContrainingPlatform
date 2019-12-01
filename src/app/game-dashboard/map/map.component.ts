import { Component, OnInit, Directive, Input, ElementRef } from '@angular/core';
import { GamemapService } from 'src/service/map/Gamemap.service';
import { Observable } from 'rxjs';
import { User } from 'src/dto/User';
import { Router } from '@angular/router';
import { TerritorioDecorated } from 'src/dto/game/TerritorioDecorated';
import { UtilityService } from 'src/service/utility/Utility.service';
import { MapTestService } from 'src/service/frontend_scoped/map_test.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	private mapCSS: MapCss;
	private infoTerritorio : HTMLElement;
	private mainPanel : HTMLElement;
	private players : String[] = [];
	private conquistati : TerritorioDecorated[] = [];
	private confinanti : TerritorioDecorated[] = [];
	private territorioSelezionato : TerritorioDecorated = new TerritorioDecorated();
	private azioniConquista : HTMLElement;
	private azioniConfine : HTMLElement;
	private conquistaButton : HTMLElement;
	private occupaButton : HTMLElement;
	private attackers : TerritorioDecorated[] = [];
	private attacker : TerritorioDecorated = new TerritorioDecorated();
	private attackerArmate : number = 0;
	private selectedLevel : number = 1;
	private levels : any[] = [
		{level: 1, value:'LIVELLO BASE: chiama a raccolta i contadini'},
		{level: 2, value:'LIVELLO MEDIO: chiama a raccolta i soldati'},
		{level: 3, value:'LIVELLO ALTO: chiama a raccolta i carri'}
	]


	constructor(private service : GamemapService, private utility : UtilityService, private mapTest : MapTestService, private router : Router) {
	}

	ngOnInit() {
		this.mapCSS = new MapCss();
		this.mapCSS.resetMap();
		this.infoTerritorio = document.getElementById('infoTerritorio');
		this.mainPanel = document.getElementById('mainPanel');
		this.azioniConquista = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.infoTerritorio, 'azioni_conquistati')[0];
		this.azioniConfine = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.infoTerritorio, 'azioni_confinanti')[0];
		this.conquistaButton = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.azioniConfine, 'conquista')[0];
		this.occupaButton = <HTMLElement>this.utility.extendedDocument.getElementsByAttributeNameOf(this.azioniConfine, 'occupa')[0];


		this.service.startGame().subscribe(() => {
			this.service.getPartecipanti().subscribe(players => this.players = players);
			this.service.getConquistati().subscribe(conquistati => {
				this.conquistati = conquistati
			});
			this.service.getConfini().subscribe(confini => this.confinanti = confini);
		});
	}
	
	createRange(maxNumber : number) : Array<number> {
		let result : Array<number> = [];
		for(let i = 1; i < maxNumber; i++) result.push(i);

		return result;
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

	showDetail() {
		let width : string = -this.mainPanel.offsetWidth + 'px';
		this.utility.animationFactory.AnimationLeft(this.mainPanel, 0.4, this.utility.animationCurves.exponential, width).start();
		this.utility.animationFactory.AnimationLeft(this.infoTerritorio, 0.4, this.utility.animationCurves.exponential, width).start();
	}
	clickOnConquistato(elem : HTMLElement) {
		let id : number = parseInt(elem.innerText);
		this.territorioSelezionato = this.conquistati.filter((t) => t.id === id)[0];
		this.azioniConfine.className = "actions";
		this.azioniConquista.className = "actions";
		this.azioniConfine.classList.add("displayNone");
		this.showDetail();
	}
	clickOnConfinanti(elem : HTMLElement) {
		let id : number = parseInt(elem.innerText);
		this.territorioSelezionato = this.confinanti.filter((t) => t.id === id)[0];
		this.azioniConfine.className = "actions";
		this.azioniConquista.className = "actions";
		this.azioniConquista.classList.add("displayNone");

		if(this.territorioSelezionato.armate > 0) {
			if(!this.occupaButton.classList.contains('displayNone'))
				this.occupaButton.classList.add('displayNone');

			this.conquistaButton.classList.remove('displayNone');
		} else {
			if(!this.conquistaButton.classList.contains('displayNone'))
				this.conquistaButton.classList.add('displayNone');

			this.occupaButton.classList.remove('displayNone');
		}
		
		this.service.getAttackerAvailableFor(id).subscribe(list => {
			this.attackers = list;
			this.showDetail();
		});
	}
	goBack() {
		this.utility.animationFactory.AnimationLeft(this.mainPanel, 0.4, this.utility.animationCurves.exponential, '0vh').start();
		this.utility.animationFactory.AnimationLeft(this.infoTerritorio, 0.4, this.utility.animationCurves.exponential, '0vh').start();
		this.attackers =  [];
		this.attacker = new TerritorioDecorated();
		this.attackerArmate = 0;
	}

	conquista() {
		this.mapTest.reset();
		this.mapTest.setActionFunction(this.service.muovi);
		this.mapTest.setArmate(this.attackerArmate);
		this.mapTest.setTerritorioSorce(this.attacker.id);
		this.mapTest.setTerritorioTarget(this.territorioSelezionato.id);
		this.mapTest.setArgomento(this.territorioSelezionato.category.argomento.toString());
		this.mapTest.setLevel(this.selectedLevel);
		this.router.navigate(['/dashboard/test']);
		
	}
	occupa() {
		this.mapTest.reset();
		this.mapTest.setActionFunction(this.service.muovi);
		this.mapTest.setArmate(this.attackerArmate);
		this.mapTest.setTerritorioSorce(this.attacker.id);
		this.mapTest.setTerritorioTarget(this.territorioSelezionato.id);
		this.mapTest.setArgomento(this.territorioSelezionato.category.argomento.toString());
		this.mapTest.setLevel(this.selectedLevel);
		this.router.navigate(['/dashboard/test']);
	}
	rinforza() {
		this.mapTest.reset();
		this.mapTest.setActionFunction(this.service.rinforza);
		this.mapTest.setTerritorioTarget(this.territorioSelezionato.id);
		this.mapTest.setArgomento(this.territorioSelezionato.category.argomento.toString());
		this.mapTest.setLevel(this.selectedLevel);
		console.log(this.selectedLevel);
		this.router.navigate(['/dashboard/test']);
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

