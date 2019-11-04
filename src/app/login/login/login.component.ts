import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from 'src/dto/LoginCredentials';
import { LoginService } from 'src/service/user/Login.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import {NgForm} from '@angular/forms';

=======
import { NgForm } from '@angular/forms';
>>>>>>> a5c2f5a9075b8bc90073f0ae62b103e49af45263

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : LoginService, private router : Router) { }

  ngOnInit() {
<<<<<<< HEAD
    /*this.login();*/
=======
    this.login(null);
>>>>>>> a5c2f5a9075b8bc90073f0ae62b103e49af45263
  }
  

  login(f: NgForm) {
<<<<<<< HEAD
=======
    //let credentials : LoginCredentials = new LoginCredentials(f.value.username, f.value.password);
>>>>>>> a5c2f5a9075b8bc90073f0ae62b103e49af45263
    let credentials : LoginCredentials = new LoginCredentials('user1', 'user');
    this.service.login(credentials).subscribe((user) => {
      if(user == null)
        return;

      localStorage.setItem('currentUser', JSON.stringify(user));
      if(user.usertype.toString().toUpperCase() === 'ADMIN')
        alert('no admin for now');
      else 
        this.router.navigate(['/dashboard']);
    });

  }

}
