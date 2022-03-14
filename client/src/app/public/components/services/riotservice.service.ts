import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class RiotsummonService {

  constructor(private http: HttpClient) { }

  getSummoner = (name:string) => {
    let body = { name: name };
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    return this.http.post(`http://localhost:8080/api/riot/summoner`,body, {headers})
  }
}
