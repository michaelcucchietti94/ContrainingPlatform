import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO } from 'src/dto/userdto';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from 'src/dto/logindto';
import { Observable } from 'rxjs';
import { TestsDTO } from 'src/dto/testsdto';
import { MicroService } from './microservice';


@Injectable({
    providedIn: 'root'
  })
  export class TestService extends MicroService<TestsDTO>{
  
    constructor(http: HttpClient) {
      super(http, 'test', 'tests');
      
    }

    

  }