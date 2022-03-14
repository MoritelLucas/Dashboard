import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  constructor(private http: HttpClient) { }

  getSearchYT = (channel:string) => {
    let body = { channelid: channel };
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    return this.http.post(`http://localhost:8080/api/youtube/search`,body, {headers})
  }

}
