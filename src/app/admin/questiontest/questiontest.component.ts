import { Component, OnInit } from '@angular/core';
import { QuestionsDTO } from 'src/dto/questionsdto';
import { TestsDTO } from 'src/dto/testsdto';
import { QuestionsService } from 'src/service/questions.service';
import { TestService } from 'src/service/test.service';

@Component({
  selector: 'app-questiontest',
  templateUrl: './questiontest.component.html',
  styleUrls: ['./questiontest.component.css']
})
export class QuestiontestComponent implements OnInit {
  questions: QuestionsDTO[];
  questionsAvaliable : QuestionsDTO[];
  questionChanged : QuestionsDTO[] = new Array();
  tests: TestsDTO[];
  testupdate: TestsDTO = new TestsDTO();
  questiontoadd: QuestionsDTO = new QuestionsDTO();
  questiontoremove: QuestionsDTO = new QuestionsDTO();
  questionUpdated : number = 0;

  constructor(private questionservice: QuestionsService, private testservice: TestService) { }

  ngOnInit() {
    this.getTest();
  }
  getTest() {
    this.testservice.getAll().subscribe((test) => {
      this.tests = test;
      this.questionservice.getAll().subscribe((questions) => {
        this.questions = questions;
        this.questionsAvaliable = new Array();
        this.questions.forEach(q => {
          if(q.testsId == null || typeof q.testsId === 'undefined') {
            this.questionsAvaliable.push(q);
          } else {
            this.tests.forEach(t => {
              if(t.questions == null || typeof t.questions === 'undefined') {
                t.questions = new Array();
              }
              if(t.id === q.testsId) {
                t.questions.push(q);
              }
            })
          }
        })
      });
    });
  }

  /**
   * check if dto list as initialized its question list
   */
  checktest(){
    if(this.testupdate==null||typeof this.testupdate==='undefined'){
      return;
    }
    if(this.testupdate.questions==null||typeof this.testupdate.questions==='undefined'){
      this.testupdate.questions = new Array();
    }
  }

  /**
   * find the index of a question in a specified list
   * @param question to get the index of
   * @param list to search in
   */
  findIndex(question: QuestionsDTO, list : QuestionsDTO[]) : number {
    let index = list.findIndex((q) =>{
      return q.id===question.id;
    });
    return index;
  }
  /**
   * add a question to a specified list
   * @param question to add
   * @param list target for the specified question
   */
  addquestiontoList(question : QuestionsDTO, list: QuestionsDTO[]) {
    list.push(question);
  }
  
  /**
   * remove a question to a specified list
   * @param question to add
   * @param list target for the specified question
   */
  removequestionfromList(question : QuestionsDTO, list : QuestionsDTO[]) {
    let index=this.findIndex(question, list)
    if(index >= 0){
      list.splice(index,1);
    }
  }

  addQuestionToTest(question : QuestionsDTO, test : TestsDTO) {
    test.questions.push(question);
    question.testsId = test.id;

    if(this.findIndex(question, this.questionChanged) < 0) {
      this.questionChanged.push(question);
    }
  }

  removeQuestionFromTest(question : QuestionsDTO, test : TestsDTO) {
    this.removequestionfromList(question, test.questions);
    question.testsId = null;

    if(this.findIndex(question, this.questionChanged) < 0) {
      this.questionChanged.push(question);
    }

  }

  /**
   * add a specified question to selected test
   * @param question to add
   */
  addquestion(question:QuestionsDTO){
    this.checktest();
    this.addQuestionToTest(question, this.testupdate);
    this.removequestionfromList(question, this.questionsAvaliable);
  }

  /**
   * remove a specified question from selected test
   * @param question to remove
   */
  removequestion(question:QuestionsDTO){
    this.checktest();
    this.removeQuestionFromTest(question, this.testupdate);
    this.addquestiontoList(question, this.questionsAvaliable);
  }

  /**
   * Updates the selected test
   */
  update(){
    this.checktest();
    this.questionChanged.forEach(q => {
      this.questionservice.update(q).subscribe(() => {
          this.questionUpdated++;
          if(this.questionUpdated === this.questionChanged.length) {
            this.testservice.update(this.testupdate).subscribe(() =>{
              this.getTest();
            });
          }
      });
    })
  }

}
