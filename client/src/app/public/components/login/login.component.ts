import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CustomValidator } from '../../_helpers/customvalidators';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Userlogin } from '../services/user-service/user.login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
   })
   
  constructor(private userService: Userlogin, private router: Router) {}

  login(){
    this.userService.create({
      password: this.password.value,
      name: this.name.value,
    }).pipe(
      tap(()=> this.router.navigate(['../public/dashboard']))
    ).subscribe()
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
 
}
