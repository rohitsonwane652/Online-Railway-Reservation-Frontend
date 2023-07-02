import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PassengerDetail } from '../ticket-book/passengerDetail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url="http://localhost:8080";

  newUrl = "http://localhost:8900/book/acticket"
  constructor(private http:HttpClient) { }

  public createTransaction(amount:number){
    return this.http.get(`${this.url}/payment/createTransaction`,{params:{amount}})
  }

  public test(){
    return this.http.get(`${this.url}/payment/test`)
  }

  public bookAcTicket(passenger:PassengerDetail){
    return this.http.post(this.newUrl,passenger);
  }
}
