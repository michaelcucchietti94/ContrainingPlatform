import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingRoutingModule } from './testing-routing.module';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestingRoutingModule
  ]
})
export class TestingModule { }
