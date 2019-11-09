import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/dto/User';
import { LoginCredentials } from 'src/dto/LoginCredentials';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class LoginService {
    constructor(private http : HttpClient, private router : Router) {

    }

    login(credentials : LoginCredentials) : Observable<User>{
        return this.http.post<User>('http://localhost:8080/user/login', credentials);
    }

    logout() {
        localStorage.removeItem("currentUser");
        this.router.navigate(['/login']);
    }

    setAccessed(username : string) : Observable<any> {
        return this.http.get<any>('http://localhost:8080/user/setAccessed_' + username);
    }

}