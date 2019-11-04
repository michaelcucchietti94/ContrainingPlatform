import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from 'src/dto/LoginCredentials';
import { LoginService } from 'src/service/user/Login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : LoginService, private router : Router) { }

  ngOnInit() {
    //this.login();
  }

  login(f: NgForm) {
    //let credentials : LoginCredentials = new LoginCredentials(f.value.username, f.value.password);
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
