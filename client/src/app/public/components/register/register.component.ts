import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CustomValidator } from '../../_helpers/customvalidators';
import {HttpClient} from '@angular/common/http';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl(null, [Validators.required]),
   }, {
     validators: CustomValidator.passwordsMatching
   })
   
  constructor(private userService: UserService, private router: Router) {}

  register(){
    this.userService.create({
        email: this.email.value,
        password: this.password.value,
        name: this.name.value
      }).pipe(
        tap(()=> this.router.navigate(['../public/login']))
      ).subscribe()
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }
}
