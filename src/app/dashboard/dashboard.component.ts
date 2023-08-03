import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { DataService } from '../services/data.service';
import { BookingService } from '../services/booking.service';
import { Ticket } from '../bookings/ticket.model';
// import Razorpay from 'razorpay';


declare var Razorpay:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private bookingService:BookingService) {}

  pnrNo:number;
  ticket:Ticket;
  onSubmit(){
    this.bookingService.checkStatus(this.pnrNo).subscribe(
      (response:Ticket) => {
        this.ticket = response;
      }
    )
  }
}
