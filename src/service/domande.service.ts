import { Injectable } from '@angular/core';
import { AbstractService } from './AbstractService';
import { Test } from 'src/dto/testing/Test';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';

@Injectable ({
    providedIn : 'root'
})

export class DomandeService extends AbstractService<Test>{

    constructor(http: HttpClient) {
      super(http);
      this.serviceMap = 'test';
}
}
