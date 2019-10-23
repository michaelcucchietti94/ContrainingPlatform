import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpClientModule} from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { UserDTO } from 'src/dto/UserDTO';
import { LoginDTO } from 'src/dto/LoginDTO';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    user : UserDTO;

    constructor(private http: HttpClient) {}

    auth() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user) {
            return 'Bearer ' + this.user.authorities;
        } else {
            return '';
        }
    }

    login(loginDTO : LoginDTO) {
        return this.http.post('http://localhost:8080/api/authenticate', loginDTO);
    }

    
}