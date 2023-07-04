import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PassengerDetail } from '../ticket-book/passengerDetail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  newUrl = "http://localhost:8900/book"

  constructor(private http:HttpClient) { }

  public bookAcTicket(passenger:PassengerDetail){
    return this.http.post(`${this.newUrl}/acticket`,passenger);
  }

  public bookSlTicket(passenger:PassengerDetail){
    return this.http.post(`${this.newUrl}/slticket`,passenger);
  }

  public getAllTickets(userEmail){
    return this.http.get(`${this.newUrl}/getmytickets`,{params: {userEmail}});
  }

  public test(){
    return this.http.get<number>(`${this.newUrl}/test`);
  }
}
