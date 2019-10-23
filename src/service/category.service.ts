import { Injectable } from "@angular/core";
import {AbstractService} from './abstractservice';
import {CategoriesDTO} from 'src/dto/categoriesdto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { MicroService } from './microservice';

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends MicroService<CategoriesDTO> {
    constructor(http : HttpClient) {
        super(http, 'test', 'categories');
    }

    /* ALL CRUD HAS BEEN IMPORTED FROM PARENT CLASS */
}