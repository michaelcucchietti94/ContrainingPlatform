import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from 'src/dto/LoginCredentials';
import { LoginService } from 'src/service/user/Login.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : LoginService, private router : Router) { }

  ngOnInit() {
    /*this.login();*/
    /*this.login(null);*/
    this.logoFadeOut();
  }

  logoFadeOut() {
    setTimeout(() => {
      let logoElement = document.getElementById('contrainingLogo');
      logoElement.classList.add('fadeOutAnimation');
    }, 1500);
    setTimeout(() => {
      let logoElement = document.getElementById('contrainingLogo');
      logoElement.classList.add('displayNone');
    }, 4500);
  }

  matrixEffect(){
    let matrixElement = document.getElementById('matrix');
    let cerchio1Element = document.getElementById('cerchio1');
    let cerchio2Element = document.getElementById('cerchio2');
    let cerchio3Element = document.getElementById('cerchio3');
    let cerchio4Element = document.getElementById('cerchio4');
    matrixElement.classList.add('fadeInAnimation');
    cerchio1Element.classList.add('speedUp');
    cerchio2Element.classList.add('speedUp');
    cerchio3Element.classList.add('speedUp');
    cerchio4Element.classList.add('speedUp');
  }

  login(f: NgForm) {
    setTimeout(() =>{
      let credentials : LoginCredentials = new LoginCredentials(f.value.username, f.value.password);
      //let credentials : LoginCredentials = new LoginCredentials('user1', 'user');
      this.service.login(credentials).subscribe((user) => {
        if(user == null) {
          return;
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user.usertype.toString());
        if(user.usertype.toString().toUpperCase() === 'ADMIN'){
          this.router.navigate(['/admin-dashboard']);
        }
        else{
          this.router.navigate(['/dashboard']);
        }
      });
    }, 1500);


  }

}
