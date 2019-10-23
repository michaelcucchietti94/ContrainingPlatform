import {CategoriesDTO} from './categoriesdto';
import { QuestionsDTO } from './questionsdto';


export class TestsDTO {

    id: number;

    categoriesId : number;

    categoriesCategory : String;
 
    timeTest: number;
    
    testName: String;

    questions: QuestionsDTO[] = new Array();
 }