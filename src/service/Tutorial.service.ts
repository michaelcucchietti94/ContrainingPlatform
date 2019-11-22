import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regola } from 'src/dto/game/Regola';

@Injectable({
    providedIn: 'root'
})
export class TutorialService {

    constructor(private http : HttpClient) {}

    getAll() : Observable<Regola[]> {
        return this.http.get<Regola[]>('http://localhost:8080/tutorial/getall');
    }
}