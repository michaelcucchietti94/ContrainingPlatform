import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { QuestionsDTO } from 'src/dto/questionsdto';
import {Observable} from 'rxjs';
import { MicroService } from './microservice';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends MicroService<QuestionsDTO> {

  constructor(http : HttpClient) {
    super(http, 'test', 'questions');
   }
}
