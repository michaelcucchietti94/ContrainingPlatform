import { Component, OnInit } from '@angular/core';
import { Test } from 'src/dto/testing/Test';
import { TestService } from 'src/service/test/Test.service';
import { AbstractService } from 'src/service/AbstractService';
import { DomandeService } from 'src/service/domande.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  tests: Test[];
  testsOld: Test [];
  testToSearch: Test;
  testToInsert: Test;


constructor(private service: DomandeService) {
  this.testToInsert = new Test ();
  this.testToSearch = new Test ();
}

ngOnInit() {
  this.getTests();
}

getTests() {
  this.service.getAll().subscribe (tests => this.tests = this.testsOld = tests);
}

update(test: Test) {
  this.service.update(test).subscribe(() => this.getTests());
}

delete(test: Test){
  this.service.delete(test.id).subscribe(() => this.getTests());
}

insert (test: Test){
  this.service.insert(test).subscribe(() => this.getTests());
  this.clear();
}

clear() {
  this.testToInsert = new Test();
}

search(){
  this.tests = [];
  this.testsOld.forEach(t => {
    if ((!this.testToSearch.nome || t.nome.toLowerCase().includes(this.testToSearch.nome.toLowerCase()))
    && (!this.testToSearch.livello || t.livello == this.testToSearch.livello)
    && (!this.testToSearch.descrizione || t.descrizione.toLowerCase().includes(this.testToSearch.descrizione.toLowerCase()))) {
      this.tests.push(t);
    }
  });
}

clearSearch(){
  this.testToSearch = new Test ();
  this.tests = this.testsOld;

}
}

