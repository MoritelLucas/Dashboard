import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class RedditsearchService {

  constructor(private http: HttpClient) { }

  getSearchYT = (channel:string)  => {
    let body = { Reddit: channel };
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    let resp = this.http.post(`http://localhost:8080/api/reddit/search`,body, {headers})
    return resp
  }

}
