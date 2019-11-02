import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/dto/User';
import { LoginCredentials } from 'src/dto/LoginCredentials';

@Injectable({
    providedIn:'root'
})
export class LoginService {
    constructor(private http : HttpClient) {

    }

    login(credentials : LoginCredentials) : Observable<User>{
        return this.http.post<User>('http://localhost:8080/user/login', credentials);
    }

}