import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './service';

@Injectable({
    providedIn:'root'
})
export class AbstractService<DTO> implements Service<DTO>{
    port : number = 8080;
    server : String = 'localhost';
    serviceMap : String = '';

    constructor(protected http : HttpClient) {

    }

    getService() : String {
        return 'http://' + this.server + ":" + this.port + '/' + this.serviceMap;
    }

    getAll() : Observable<DTO[]> {
        return this.http.get<DTO[]>(this.getService() + '/getAll');
    }
    insert(data : DTO) : any {
        return this.http.post<any>(this.getService() + '/insert', data);
    }
    update(data : DTO) : any {
        return this.http.put<any>(this.getService() + '/update', data);
    }

    read(id:number): Observable<DTO>{
        return this.http.get<DTO>(this.getService() + '/read?id=' + id);
    }

    delete(id:number): Observable<any>{
        return this.http.delete(this.getService() + '/delete?id=' + id);
    }

}
