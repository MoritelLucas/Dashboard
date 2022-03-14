import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class RedditpostsService {

  constructor(private http: HttpClient) { }

  getPostsRe = (channel:string)  => {
    let body = { Reddit: channel };
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    let resp = this.http.post(`http://localhost:8080/api/reddit/posts`,body, {headers})
    return resp
  }

}
