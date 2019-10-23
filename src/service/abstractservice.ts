import { Service } from './service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from 'src/dto/userdto';

/**
 * Service astratto, implementa tutti i metodi CRUD inviando request al server di SpringBoot. 
 * @param port il port del backend
 * @param type la mappatura del controller di ciascuna entità.
 * 
 * @see Service
 * 
 * @author Vittorio Valent
 */
export abstract class AbstractService<DTO> implements Service<DTO> {

    type: string;
    port: string = '8080';
    pathToMicro : string;
    user : UserDTO;

    constructor(protected http: HttpClient) {
    }

    auth() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if(this.user) {
            return 'Bearer ' + this.user.authorities;
        } else {
            return '';
        }
      }

    getAll(): Observable<DTO[]> {
        return this.http.get<DTO[]>('http://localhost:' + this.port + '/' + this.pathToMicro, {
            headers : {
                Authorization: this.auth()
            }
        });
    }

    read(id: number): Observable<DTO> {
        return this.http.get<DTO>('http://localhost:' + this.port + '/' + this.pathToMicro + '/' + id, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    delete(id: number): Observable<any> {
        return this.http.delete('http://localhost:' + this.port + '/' + this.pathToMicro + '/' + id, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    insert(dto: DTO): Observable<any> {
        return this.http.post('http://localhost:' + this.port + '/' + this.pathToMicro, dto, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    update(dto: DTO): Observable<DTO> {
        return this.http.put<DTO>('http://localhost:' + this.port + '/' + this.pathToMicro, dto, {
            headers: {
                Authorization: this.auth()
            }
        });

    }

}