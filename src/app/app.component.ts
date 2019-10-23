import { Component, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  title = 'SampleAngular';

  constructor(private meta : Meta) {
    meta.updateTag({
      name: 'viewport',
      content: 'width=width-device, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    })
  }
}
