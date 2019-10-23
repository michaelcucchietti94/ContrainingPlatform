import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO } from 'src/dto/userdto';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from 'src/dto/logindto';
import { Observable } from 'rxjs';
import { MicroService } from './microservice';

/**
 * I service sono decorati da @Injectable. 
 * Qui trovate, oltre ai metodi ereditati dall'Abstract,
 *  il metodo per il login (in mirror con il backend).
 * 
 * @author Vittorio Valent
 * 
 * @see AbstractService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends MicroService<UserDTO>{

  constructor(http: HttpClient) {
    super(http, '', 'users');
  }

  getUser(username : string) {
    let url = this.generateURL() + '/' + username;
    return this.http.get(url, {
        headers : {
            Authorization: this.auth()
        }
    })
} 

}
