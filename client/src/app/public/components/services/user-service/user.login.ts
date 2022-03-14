import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponseI } from 'src/app/model/login-resp.interfaces';
import { Userlog } from 'src/app/model/user.login';

@Injectable({
  providedIn: 'root'
})
export class Userlogin {

  constructor(private http: HttpClient, private snackbar:MatSnackBar) { }

  create(user: Userlog): Observable<Userlog>{
   return this.http.post<Userlog>('http://localhost:8080/api/user/login', user)
    .pipe(
      tap(() => this.snackbar.open('User log successfully', 'Close',{
      duration:2000, horizontalPosition: 'right', verticalPosition: 'top'
    }))
    )
  }
}
