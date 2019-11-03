import { Injectable } from '@angular/core';
import { AbstractService } from '../AbstractService';
import { User } from 'src/dto/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class UserService extends AbstractService<User> {
    constructor(protected http : HttpClient) {
        super(http);
        this.serviceMap = "user";
    }

    


}