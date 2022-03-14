import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrency =  (values:string, sym1:string, sym2:string) => {
    let body = {value:values.toString(), currency1: sym1.toString(), currency2: sym2.toString()};
    let headers = {"x-access-token": GlobalConstants.jwtToken, "Content-Type": "application/json"};
    return this.http.post(`http://localhost:8080/api/currency/value`, body, { headers })
  }
}
