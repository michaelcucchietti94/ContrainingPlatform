import { Injectable } from '@angular/core';
import { Action } from 'src/dto/game/Action';
import { UserTestScore } from 'src/dto/testing/UserTestScore';
import { GamemapService } from '../map/Gamemap.service';
import { ConquestResult } from 'src/dto/game/ConquestResult';

@Injectable({
    providedIn: 'root'
})
export class MapTestService {
    private action : Action;
    private actionFunction : Function;
    private argomento : string;
    private level : number = 1;
    private conquering : boolean = false;
    private conquestResult : ConquestResult;

    constructor(private gameMapService : GamemapService) {
        this.action = new Action();
    }
    reset() {
        this.action = new Action();
        this.actionFunction = null;
        this.argomento = "";
        this.conquering = false;
        this.level = 1;
    }
    setArgomento(argomento : string) {
        this.argomento = argomento;
    }
    getArgomento() : string {
        return this.argomento;
    }
    setConquering(value : boolean) {
        this.conquering = value;
    }
    isConquering() : boolean {
        return this.conquering;
    }
    setLevel(level : number) {
        this.level = level;
    }
    getLevel() {
        return this.level;
    }
    setActionFunction(f : Function) {
        this.actionFunction = f;
    }
    setScore(score : UserTestScore) {
        this.action.score = score;
    }
    setArmate(armate : number) {
        this.action.armate = armate;
    }
    setTerritorioTarget(id : number) {
        this.action.territorioDest = id;
    }
    setTerritorioSorce(id : number) {
        this.action.territorioSource = id;
    }
    getConquestResult() : ConquestResult {
        return this.conquestResult;
    }
    setConquestResult(result : ConquestResult) {
        this.conquestResult = result;
    }

    doAction() : any {
        return this.actionFunction.apply(this.gameMapService, [this.action]);
    }

}