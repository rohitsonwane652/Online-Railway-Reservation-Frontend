import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PassengerDetail } from '../ticket-book/passengerDetail.model';
import { EmailRequest } from '../classes/EmailRequest.model';
import { API_ENDPOINT } from '../api-contants';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  newUrl = `${API_ENDPOINT}/book`;

  constructor(private http:HttpClient) { }

  async bookAcTicket(passenger:PassengerDetail):Promise<any>{
    // return await this.http.post(`${this.newUrl}/acticket`,passenger);
    try {
      const data = await this.http.post(`${this.newUrl}/acticket`,passenger).toPromise();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async bookSlTicket(passenger:PassengerDetail){
    // return this.http.post(`${this.newUrl}/slticket`,passenger);
    try {
      const data = await this.http.post(`${this.newUrl}/slticket`,passenger).toPromise();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public getAllTickets(userEmail){
    return this.http.get(`${this.newUrl}/getmytickets`,{params: {userEmail}});
  }

  public cancelAcTicket(pnrNo:number){
    // console.log(pnrNo);
    return this.http.put(`${this.newUrl}/cancelacticket/${pnrNo}`,{params: {pnrNo}});
  }

  public cancelSlTicket(pnrNo:number){
    // console.log(pnrNo);
    return this.http.put(`${this.newUrl}/cancelslticket/${pnrNo}`,{params: {pnrNo}});
  }

  public checkStatus(pnrNo:number){
    return this.http.get(`${this.newUrl}/pnrstatus/${pnrNo}`,{params:{pnrNo}});
  }

  public sendEmail(emailRequest:EmailRequest){
    return this.http.post(`${this.newUrl}/send-email`,emailRequest);
  }
}
