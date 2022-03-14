import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class RedditmysubService {

  constructor(private http: HttpClient) { }

  getMysubRe = ()  => {
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    let resp = this.http.get(`http://localhost:8080/api/reddit/my/sub`, {headers})
   return resp
  }

}
