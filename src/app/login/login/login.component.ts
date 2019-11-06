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
    let cerchioElement = document.getElementById('cerchio');
    matrixElement.classList.add('fadeInAnimation');
    cerchioElement.classList.add('speedUp');
  }

  login(f: NgForm) {
    setTimeout(() =>{
      let credentials : LoginCredentials = new LoginCredentials(f.value.username, f.value.password);
      //let credentials : LoginCredentials = new LoginCredentials('user1', 'user');
      this.service.login(credentials).subscribe((user) => {
        if(user == null)
          return;

        localStorage.setItem('currentUser', JSON.stringify(user));
        if(user.usertype.toString().toUpperCase() === 'ADMIN')
          alert('no admin for now');
        else 
          this.router.navigate(['/dashboard']);
      });
    }, 1500);
    

  }

}
