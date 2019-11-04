import { Injectable } from '@angular/core';
import { AbstractService } from '../AbstractService';
import { User } from 'src/dto/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ranking } from 'src/dto/game/Ranking';

@Injectable({
    providedIn:'root'
})
export class UserService extends AbstractService<User> {
    constructor(protected http : HttpClient) {
        super(http);
        this.serviceMap = "user";
    }

    dailyRanking() : Observable<Ranking[]> {
        return this.http.get<Ranking[]>(this.getService() + '/dailyranking');
    }
    
    weeklyRanking() : Observable<Ranking[]> {
        return this.http.get<Ranking[]>(this.getService() + '/weeklyranking');
    }
    
    levelRanking(livello : number) : Observable<Ranking[]> {
        return this.http.get<Ranking[]>(this.getService() + '/levelranking_' + livello);
    }


}