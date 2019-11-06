import { Component, OnInit, Directive, Input, ElementRef } from '@angular/core';
import { Continente } from 'src/dto/game/Continente';
import { GamemapService } from 'src/service/map/Gamemap.service';
import { Observable } from 'rxjs';
import { ContinentePiece } from 'src/dto/game/ContinentPiece';
import { StatoDecorated } from 'src/dto/game/StatoDecorated';
import { RequestState } from 'src/dto/game/RequestState';
import { User } from 'src/dto/User';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	elements : Data[] = [];
	private serviceContainer : ServiceAdapterContainer;
	private currentElement : Data;
	private mainData = new Data(0, 'continente');
	private mapCSS: MapCss;
	private mapNavigatorElements : HTMLElement;

	constructor(private service : GamemapService) {
	}

	private disableCheck() {
		setInterval(() => {
			if(this.mapNavigatorElements == null || typeof this.mapNavigatorElements === 'undefined')
				return;

			let aTags : HTMLCollection = this.mapNavigatorElements.getElementsByTagName("a");
			for(let i = 0; i < aTags.length; i++) {
				let a = aTags.item(i);
				if(a.getAttribute('elementenabled') === 'false')
					a.classList.add('disabled');
			}
		}, 50);
		
	}

	ngOnInit() {
		this.mainData.viewType = ViewType.World;
		this.mapNavigatorElements = document.getElementById('mapElements');
		this.serviceContainer = new ServiceAdapterContainer(this.service);
		this.serviceContainer.getChildren(this.elements, this.mainData)				// we get Continenti
		this.currentElement = this.mainData;
		this.mapCSS = new MapCss();
		this.updateMap();
		this.disableCheck();

	}
	
	goDown(d : Data) {
		if(!d.enabled)
			return;
		if(d.viewType !== ViewType.State) {
			this.serviceContainer.getChildren(this.elements, d);
			this.currentElement = d;
			this.updateMap();
		}
	}
	goUp() {
		if(this.currentElement.viewType !== ViewType.World) {
			this.serviceContainer.getParents(this.elements);
			this.currentElement = this.currentElement.parent;
			this.updateMap();
		}
	}
	
	overSpecific(d : Data)  {		
		this.mapCSS.applySpecific(this.currentElement, d.testo)
	}
	leaveSpecific() {
		this.updateMap();
	}

	updateMap() {
		this.mapCSS.updateMap(this.currentElement);
	}

}

class MapCss {
	private mapElement : HTMLElement;
	constructor() {
		this.mapElement = document.getElementById('contrainingMap');
	}

	updateMap(currentElement : Data) {
		this.mapElement.className = '';
		this.mapElement.classList.add('map');
		let className : string = currentElement.testo.replace(/(\s+)/g, '_');
		this.mapElement.classList.add(className);
	}

	applySpecific(currentElement : Data, selector : string) {
		this.mapElement.className = '';
		this.mapElement.classList.add('map');
		let className : string = currentElement.testo.replace(/(\s+)/g, '_');
		className += '_' + selector.replace(/(\s+)/g, '_');
		this.mapElement.classList.add(className);

	}
}

enum ServiceAdapters {
	Continenti, Pieces, Stati, End
}
class ServiceAdapterContainer {
	private adapterSelector : ServiceAdapters = ServiceAdapters.Continenti;
	private continentAdapter : ContinenteAdapter;
	private piecesAdapter : ContinentePieceAdapter;
	private statiAdapter : StatiAdapter;

	constructor(private service : GamemapService) {
		this.continentAdapter = new ContinenteAdapter(service);
		this.piecesAdapter = new ContinentePieceAdapter(service);
		this.statiAdapter = new StatiAdapter(service);
	}
	
	getChildren(targetList : Data[], d : Data) : void {
		if(this.adapterSelector === ServiceAdapters.Continenti) {
			this.continentAdapter.main = d;
			this.continentAdapter.callService().subscribe(continenti => {
				targetList.splice(0, targetList.length);
				let datas : Data[] = this.continentAdapter.convert(continenti);
				datas.forEach(d => targetList.push(d));
				this.adapterSelector = ServiceAdapters.Pieces;
			});
		} else if(this.adapterSelector === ServiceAdapters.Pieces) {
			this.piecesAdapter.continente = d;
			this.piecesAdapter.callService().subscribe(pieces => {
				targetList.splice(0, targetList.length);
				this.piecesAdapter.convert(pieces).forEach(d => {
					targetList.push(d);
				});
				this.adapterSelector = ServiceAdapters.Stati;
			});
		} else if(this.adapterSelector === ServiceAdapters.Stati) {
			this.statiAdapter.piece = d;
			this.statiAdapter.callService().subscribe(stati => {
				targetList.splice(0, targetList.length);
				this.statiAdapter.convert(stati).forEach(d => {
					targetList.push(d);
				});
				this.adapterSelector = ServiceAdapters.End;
			});
		}
	}
	getParents(targetList : Data[]) : void {
		if(this.adapterSelector === ServiceAdapters.End) {
			this.piecesAdapter.callService().subscribe(pieces => {
				targetList.splice(0, targetList.length);
				this.piecesAdapter.convert(pieces).forEach(d => {
					targetList.push(d);
				});
				this.adapterSelector = ServiceAdapters.Stati;
			});
		} else if(this.adapterSelector === ServiceAdapters.Stati) {
			this.continentAdapter.callService().subscribe(continenti => {
				targetList.splice(0, targetList.length);
				this.continentAdapter.convert(continenti).forEach(d => {
					targetList.push(d);
				});
				this.adapterSelector = ServiceAdapters.Pieces;
			});
		}
	}
}

class Data {
	id : number;
	testo : string;
	parent : Data;
	viewType : ViewType;
	enabled : boolean = true;

	constructor(id : number, testo : string) {
		this.id = id;
		this.testo = testo;
		this.parent = null;
	}
}
enum ViewType {
	World, Continente, Piece, State
}
interface ServiceAdapter<DTO> {
	callService() : Observable<DTO[]>;
	convert(list : DTO[]) : Data[];
}
class ContinenteAdapter implements ServiceAdapter<Continente> {
	main : Data;
	constructor(private service : GamemapService) {}
	
	convert(list: Continente[]): Data[] {
		let results : Data[] = [];
		
		list.forEach(element => {
			let d : Data = new Data(element.id, element.nome.toString());
			d.parent = this.main;
			d.viewType = ViewType.Continente;
			results.push(d);
		})

		return results;
	}
	callService(): Observable<Continente[]> {
		return this.service.getContinenti();
	}
}
class ContinentePieceAdapter implements ServiceAdapter<ContinentePiece> {
	continente : Data = null;
	constructor(private service : GamemapService) {}
	
	convert(list: ContinentePiece[]): Data[] {
		let results : Data[] = [];
		
		list.forEach(element => {
			let d : Data = new Data(element.id, element.nome.toString());
			d.parent = this.continente;
			d.viewType = ViewType.Piece;
			results.push(d);
		})

		return results;
	}
	callService(): Observable<ContinentePiece[]> {
		return this.service.getContinentiPieces(this.continente.id);
	}
}

class StatiAdapter implements ServiceAdapter<StatoDecorated> {
	piece : Data = null;
	constructor(private service : GamemapService) {}
	
	convert(list: StatoDecorated[]): Data[] {
		let results : Data[] = [];
		
		list.forEach(element => {
			let d : Data = new Data(element.id, element.name.toString());
			d.parent = this.piece;
			d.viewType = ViewType.State;
			d.enabled = element.enabled.valueOf();
			results.push(d);
		})

		return results;
	}
	callService(): Observable<StatoDecorated[]> {
		let request = new RequestState();
		let piece = new ContinentePiece();
		piece.id = this.piece.id;
		let user : User = JSON.parse(localStorage.getItem("currentUser"));
		request.continentPiece = piece;
		request.user = user;

		return this.service.getStati(request);
	}
}

