import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingRoutingModule } from './testing-routing.module';
import { TestComponent } from './test/test.component';
import { TestTimerComponent } from './test-timer/test-timer.component';
import { UsertestComponent } from './usertest/usertest.component';



@NgModule({
  declarations: [TestComponent, TestTimerComponent, UsertestComponent],
  imports: [
    CommonModule,
    TestingRoutingModule
  ]
})
export class TestingModule { }
