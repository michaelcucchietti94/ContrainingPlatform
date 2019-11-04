import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Continente } from 'src/dto/game/Continente';
import { ContinentePiece } from 'src/dto/game/ContinentPiece';
import { StatoDecorated } from 'src/dto/game/StatoDecorated';

@Injectable({
    providedIn: 'root'
})
export class GamemapService {
    constructor(private http : HttpClient) {}

    getContinenti() : Observable<Continente[]> {
        return this.http.get<Continente[]>('http://localhost:8080/game/continenti');
    }
    getContinentiPieces(idContinente : number) : Observable<ContinentePiece[]> {
        return this.http.get<ContinentePiece[]>('http://localhost:8080/game/PiecesByContinente_' + idContinente);
    }
    getStati(idPiece : number) : Observable<StatoDecorated[]> {
        return this.http.get<StatoDecorated[]>('http://localhost:8080/game/StatiByContinentPiece_' + idPiece);
    }
}