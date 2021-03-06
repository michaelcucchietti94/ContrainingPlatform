import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UserService } from 'src/service/user/User.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/dto/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;

  constructor(private router: Router, private fb: FormBuilder, private service: UserService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.angForm = this.fb.group({
       username: ['', Validators.required ],
       password: ['', Validators.required ],
       nome: ['', Validators.required ],
       cognome: ['', Validators.required ],
       dataNascita : ['', Validators.required ],
       email: ['', Validators.required ],
    });
  }

  signUp() {
    this.resetErrors();
    this.submitted = true;
    if (this.angForm.valid) {
      let user: User = new User();
      user.username = this.angForm.controls['username'].value;
      user.password = this.angForm.controls['password'].value;
      user.nome = this.angForm.controls['nome'].value;
      user.cognome = this.angForm.controls['cognome'].value;
      user.dataNascita = this.angForm.controls['dataNascita'].value;
      user.email = this.angForm.controls['email'].value;
      console.log(user);
      this.service.insert(user).subscribe(() => {
        this.router.navigateByUrl('/login');
      },
      response => this.processError(response));
    }
  }

  isInvalid(field: string): boolean {
    return (this.submitted && (this.angForm.controls[field].invalid))
            || this.angForm.controls[field].invalid && (this.angForm.controls[field].dirty
              || this.angForm.controls[field].touched);
  }

  processError(response: HttpErrorResponse) {
    if (response.status === 400 && response.error.errorKey === 'userexists') {
        this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.errorKey === 'emailexists') {
        this.errorEmailExists = 'ERROR';
    } else {
        this.error = 'ERROR';
    }
  }

  resetErrors() {
    this.errorEmailExists = null;
    this.errorUserExists = null;
    this.error = null;
  }

}
