import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackbar:MatSnackBar) { }

  create(user: UserI): Observable<UserI>{
   return this.http.post<UserI>('http://localhost:8080/api/user/register', user)
    .pipe(tap((createdUser: UserI) => this.snackbar.open('user created successfully', 'Close',{
      duration:2000, horizontalPosition: 'right', verticalPosition: 'top'
    }))
    )
  }
}
