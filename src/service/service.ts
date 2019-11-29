import { Observable } from 'rxjs';

export interface Service<DTO>{
    getAll(): Observable<DTO[]>;
    read(id: number): Observable<DTO>;
    insert(data:DTO): Observable<any>;
    update(data:DTO): Observable<any>;
    delete(id:number): Observable<any>;
}
