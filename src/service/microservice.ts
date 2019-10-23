import { Injectable } from "@angular/core";
import {AbstractService} from './abstractservice';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MicroService<DTO> extends AbstractService<DTO> {
    constructor(http : HttpClient, microserviceName : string, entityName : string) {
        super(http);
        this.port = "8080";
    
        this.pathToMicro = microserviceName;
        if(microserviceName.length > 0)
            this.pathToMicro += '/';

        this.pathToMicro += 'api/' + entityName;
    }

    generateURL() : string {
        return 'http://localhost:' + this.port + '/' + this.pathToMicro;
    }



}