import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  tickets:Ticket[] = [];
  constructor(private bookingService:BookingService){
    bookingService.getAllTickets(sessionStorage.getItem("userEmail")).subscribe(
      (response:Ticket[]) =>{
        this.tickets = response;
        console.log(this.tickets);
      },
      error =>{
        console.log(error);
      }
    )
  }


}
