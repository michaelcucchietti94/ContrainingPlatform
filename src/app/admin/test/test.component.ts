import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/service/test.service';
import { CategoryService } from 'src/service/category.service';
import { TestsDTO } from 'src/dto/testsdto';
import { CategoriesDTO } from 'src/dto/categoriesdto';
import { QuestionsService } from 'src/service/questions.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  tests: TestsDTO[];
  testtoinsert: TestsDTO = new TestsDTO();
  categories : CategoriesDTO[];

  constructor(private service: TestService, private categoryService : CategoryService, private questionService : QuestionsService) { }

  ngOnInit() {
    this.getTest();
  }

  getTest() {
    this.service.getAll().subscribe((test) => {
      this.tests = test;
      this.questionService.getAll().subscribe((questions) => {
          this.tests.forEach(t => {
            questions.forEach(q => {
              if(q.testsId === t.id) {
                t.questions.push(q);
              }
            })
          })
      });
    });
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  delete(test: TestsDTO) {
    this.service.delete(test.id).subscribe(() => this.getTest());
  }

  update(test: TestsDTO) {
    this.service.update(test).subscribe(() => this.getTest());
  }

  insert(test: TestsDTO) {
    this.service.insert(test).subscribe(() => this.getTest());
  }

  clear(){
    this.testtoinsert = new TestsDTO();
  }



}
