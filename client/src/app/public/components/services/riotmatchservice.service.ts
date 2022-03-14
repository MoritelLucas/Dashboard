import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class RiotmatchserviceService {

  constructor(private http: HttpClient) { }

  getMatch = (name:string) => {
    let body = { name: name };
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    return this.http.post(`http://localhost:8080/api/riot/lastmatch`,body, {headers})
  }
}
