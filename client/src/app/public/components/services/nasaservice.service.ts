import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class NasaserviceService {

  constructor(private http: HttpClient) { }

  getImage = (sol:string, cam:string) => {
    let body = { sol: sol, cam:cam };
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    return this.http.post(`http://localhost:8080/api/nasa/picture`,body, {headers})
  }
}
