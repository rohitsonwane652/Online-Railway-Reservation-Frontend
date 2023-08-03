import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Ticket } from './ticket.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  tickets:Ticket[] = [];
  
  constructor(private bookingService:BookingService,private router:Router){
    bookingService.getAllTickets(sessionStorage.getItem("userEmail")).subscribe(
      (response:Ticket[]) =>{
        this.tickets = response;
      },
      error =>{
        console.log(error);
      }
    )
  }

  

  cancelTicket(ticket:Ticket){
    Swal.fire({
      title:'Are you Sure?',
      text:'',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes',
      cancelButtonText:'Cancel'
  
    }).then((result)=>{
      if(result.isConfirmed){
        const seatType = ticket.seatType;
        const pnrNo = ticket.pnrNo;
        if(seatType === "AC"){
          this.bookingService.cancelAcTicket(pnrNo).subscribe();
        }
        else{
          this.bookingService.cancelSlTicket(pnrNo).subscribe()
        }
        window.location.reload();
      }
    })  
  }
}
