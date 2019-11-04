import { Component, OnInit } from '@angular/core';
import { Continente } from 'src/dto/game/Continente';
import { GamemapService } from 'src/service/map/Gamemap.service';
import { Observable } from 'rxjs';
import { ContinentePiece } from 'src/dto/game/ContinentPiece';
import { StatoDecorated } from 'src/dto/game/StatoDecorated';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	elements : Data[] = [];
	private serviceContainer : ServiceAdapterContainer;

	constructor(private service : GamemapService) {
	}

	ngOnInit() {
		this.serviceContainer = new ServiceAdapterContainer(this.service);
		this.serviceContainer.getChildren(this.elements)				// we get Continenti
	}
	
	goDown(id : number) {
		this.serviceContainer.getChildren(this.elements, id);
	}
	goUp() {
		this.serviceContainer.getParents(this.elements);
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

	getChildren(targetList : Data[], id : number = 0) : void {
		if(this.adapterSelector === ServiceAdapters.Continenti) {
			this.continentAdapter.callService().subscribe(continenti => {
				targetList.splice(0, targetList.length);
				let datas : Data[] = this.continentAdapter.convert(continenti);
				datas.forEach(d => targetList.push(d));
				this.adapterSelector = ServiceAdapters.Pieces;
			});
		} else if(this.adapterSelector === ServiceAdapters.Pieces) {
			this.piecesAdapter.idContinente = id;
			this.piecesAdapter.callService().subscribe(pieces => {
				targetList.splice(0, targetList.length);
				this.piecesAdapter.convert(pieces).forEach(d => {
					targetList.push(d);
				});
				this.adapterSelector = ServiceAdapters.Stati;
			});
		} else if(this.adapterSelector === ServiceAdapters.Stati) {
			this.statiAdapter.idPiece = id;
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
	constructor(id : number, testo : string) {
		this.id = id;
		this.testo = testo;
	}
}
interface ServiceAdapter<DTO> {
	callService() : Observable<DTO[]>;
	convert(list : DTO[]) : Data[];
}
class ContinenteAdapter implements ServiceAdapter<Continente> {

	constructor(private service : GamemapService) {}
	
	convert(list: Continente[]): Data[] {
		let results : Data[] = [];
		
		list.forEach(element => {
			let d : Data = new Data(element.id, element.nome.toString());
			results.push(d);
		})

		return results;
	}
	callService(): Observable<Continente[]> {
		return this.service.getContinenti();
	}
}
class ContinentePieceAdapter implements ServiceAdapter<ContinentePiece> {
	idContinente : number = null;
	constructor(private service : GamemapService) {}
	
	convert(list: ContinentePiece[]): Data[] {
		let results : Data[] = [];
		
		list.forEach(element => {
			let d : Data = new Data(element.id, element.nome.toString());
			results.push(d);
		})

		return results;
	}
	callService(): Observable<ContinentePiece[]> {
		return this.service.getContinentiPieces(this.idContinente);
	}
}

class StatiAdapter implements ServiceAdapter<StatoDecorated> {
	idPiece : number = null;
	constructor(private service : GamemapService) {}
	
	convert(list: StatoDecorated[]): Data[] {
		let results : Data[] = [];
		
		list.forEach(element => {
			let d : Data = new Data(element.id, element.name.toString());
			results.push(d);
		})

		return results;
	}
	callService(): Observable<StatoDecorated[]> {
		return this.service.getStati(this.idPiece);
	}
}

