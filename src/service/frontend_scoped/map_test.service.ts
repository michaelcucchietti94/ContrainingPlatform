import { Injectable } from '@angular/core';
import { Action } from 'src/dto/game/Action';
import { UserTestScore } from 'src/dto/testing/UserTestScore';
import { GamemapService } from '../map/Gamemap.service';

@Injectable({
    providedIn: 'root'
})
export class MapTestService {
    private action : Action;
    private actionFunction : Function;
    private argomento : string;
    private level : number = 1;

    constructor(private gameMapService : GamemapService) {
        this.action = new Action();
    }
    reset() {
        this.action = new Action();
        this.actionFunction = null;
        this.argomento = "";
    }
    setArgomento(argomento : string) {
        this.argomento = argomento;
    }
    getArgomento() : string {
        return this.argomento;
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

    doAction() : any {
        return this.actionFunction.apply(this.gameMapService, [this.action]);
    }

}