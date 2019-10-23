import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/service/questions.service';
import { QuestionsDTO } from 'src/dto/questionsdto';
import { TestsDTO } from 'src/dto/testsdto';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: QuestionsDTO[];
  questionToInsert : QuestionsDTO = new QuestionsDTO();
  tests : TestsDTO[];

  constructor(private service : QuestionsService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((questions) => {
      this.questions = questions;
    });
  }

  delete(question : QuestionsDTO) {
    this.service.delete(question.id).subscribe(() => {
      this.getAll();
    })
  }

  insert(question : QuestionsDTO) {
    this.service.insert(question).subscribe(() => {
      this.getAll();
    })
  }

  update(question : QuestionsDTO) {
    this.service.update(question).subscribe(() => {
      this.getAll();
    })
  }

  clear() {
    this.questionToInsert = new QuestionsDTO();
  }

}
