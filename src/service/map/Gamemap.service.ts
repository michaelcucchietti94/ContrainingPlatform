import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/dto/User';
import { TerritorioDecorated } from 'src/dto/game/TerritorioDecorated';
import { Action } from 'src/dto/game/Action';

@Injectable({
    providedIn: 'root'
})
export class GamemapService {
    constructor(private http : HttpClient) {}

    startGame() : Observable<void> {
        let u : User = JSON.parse(localStorage.getItem("currentUser"));
        return this.http.post<void>('http://localhost:8080/game/match/start', u);
    }

    getConfini() : Observable<TerritorioDecorated[]> {
        return this.http.get<TerritorioDecorated[]>('http://localhost:8080/game/match/getConfini');
    }
    getConquistati() : Observable<TerritorioDecorated[]> {
        return this.http.get<TerritorioDecorated[]>('http://localhost:8080/game/match/getConquistati');
    }
    getPartecipanti() : Observable<String[]> {
        return this.http.get<String[]>('http://localhost:8080/game/match/getPartecipanti');
    }

    getTerritoriOf(nome : string) : Observable<TerritorioDecorated[]> {
        return this.http.get<TerritorioDecorated[]>('http://localhost:8080/game/match/getTerritoriOf_' + nome);
    }
    
    muovi(azione : Action) : Observable<void> {
        return this.http.post<void>('http://localhost:8080/game/match/muovi', azione);
    }
    rinforza(azione : Action) : Observable<void> {
        return this.http.post<void>('http://localhost:8080/game/match/rinforza', azione);
    }

}