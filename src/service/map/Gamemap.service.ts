import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Continente } from 'src/dto/game/Continente';
import { ContinentePiece } from 'src/dto/game/ContinentPiece';
import { StatoDecorated } from 'src/dto/game/StatoDecorated';
import { RequestState } from 'src/dto/game/RequestState';

@Injectable({
    providedIn: 'root'
})
export class GamemapService {
    constructor(private http : HttpClient) {}

}