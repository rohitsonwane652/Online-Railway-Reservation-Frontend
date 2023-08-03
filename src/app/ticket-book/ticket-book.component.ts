import { Component,OnInit } from '@angular/core';
import { BookingDetail } from './bookingDetail.model';
import { DataService } from '../services/data.service';
import { PassengerDetail } from './passengerDetail.model';
import { TrainDetail } from '../search/traindetail.model';
import { LoginService } from '../services/login.service';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Ticket } from '../bookings/ticket.model';
import { EmailRequest } from '../classes/EmailRequest.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var Razorpay:any;

@Component({
  selector: 'app-ticket-book',
  templateUrl: './ticket-book.component.html',
  styleUrls: ['./ticket-book.component.css']
})
export class TicketBookComponent implements OnInit {

  bookingTrainDetail:BookingDetail;
  train:TrainDetail;
  searchDetail={
    sourceStation:'',
    destStation:'',
    dateOfJourney:''
  }
  seatType:String;
  fare:number;
  passengerForm: FormGroup;
  constructor(private dataService:DataService,private loginService:LoginService,
            private paymentService:PaymentService,private router:Router,
            private bookingService:BookingService,private formBuilder: FormBuilder) {

        this.bookingTrainDetail =  this.dataService.getBookingTrainDetail();
        this.train = this.bookingTrainDetail.train;
        this.searchDetail = this.dataService.getSearchDetails();
        this.getSeatType();

        this.passengerForm = this.formBuilder.group({
          name: ['', [Validators.required, Validators.pattern('[A-Za-z\\s]+')]],
          passengerAge: ['',[Validators.required,Validators.min(0)]],
          gender: ['']
        });
  }

  get name(){
    return this.passengerForm.get('name');
  }
  get passengerAge(){
    return this.passengerForm.get('passengerAge');
  }

  getSeatType(){
    if(this.bookingTrainDetail.seatType === 'ac'){
      this.seatType = "AC";
      this.fare = this.train.fareAC;
    }
    else{
      this.seatType = "Sleeper"
      this.fare = this.train.fareSL;
    }
  }

  ngOnInit(){
    
  }

  passengerDetails:PassengerDetail[] = [];
  fullName:'';
  age:'';
  gender:'';

  isPassengerEmpty:boolean = true;
  passengerLimitMessage:String = '';
  limitExceed:boolean = false;

  addPassenger(){
    if(this.passengerDetails.length < 6){
      const userEmail = this.loginService.getLoginUser();

      const train:TrainDetail = this.bookingTrainDetail.train;
      
      this.passengerDetails.push(new PassengerDetail(this.fullName,this.age,this.gender,train.trainNo,
          userEmail,this.searchDetail.sourceStation,this.searchDetail.destStation,train.departureTime,train.arrivalTime));
      this.passengerForm.reset();
      this.isPassengerEmpty = false;
    }
    else{
      this.passengerLimitMessage = "You can only book 6 Passeneger Tickets at once";
      this.limitExceed = true;
    }
  }

  calculateTotalFare(){
    const train:TrainDetail = this.bookingTrainDetail.train;
    const seatType = this.bookingTrainDetail.seatType;
    let totalFare;
    if(seatType === 'ac'){
      totalFare = this.passengerDetails.length * train.fareAC;
    }else{
      totalFare = this.passengerDetails.length * train.fareSL;
    }
    return totalFare;
  }

  tickets:Ticket[] = [];
  bookedTicket:any;

  async bookTicket() : Promise<void>{
    for(const passenger of this.passengerDetails){
       if(this.seatType === 'AC'){
        // this.bookingService.bookAcTicket(passenger).subscribe(
        //   (response:Ticket) =>{
        //     this.bookedTicket = response;
        //     console.log(this.bookedTicket);
        //   }
        // );
        this.bookedTicket = await this.bookingService.bookAcTicket(passenger);
        this.tickets.push(this.bookedTicket);
      }
      else{
        // this.bookingService.bookSlTicket(passenger).subscribe(
        //   (response:Ticket) =>{
        //     this.bookedTicket = response;
        //     console.log(this.bookedTicket);
        //   }
        // );
        this.bookedTicket = await this.bookingService.bookSlTicket(passenger);
        this.tickets.push(this.bookedTicket);
      }
    }

    const to = sessionStorage.getItem('userEmail');
    const subject = "Train Ticket Booking Mail";
    const message = JSON.stringify(this.tickets,null,"\t");
    const email:EmailRequest = new EmailRequest(to,subject,message);
    console.log(email);
    this.bookingService.sendEmail(email).subscribe();
  }
  

  onSubmit(){
    const amount = this.calculateTotalFare();
    this.paymentService.createTransaction(amount).subscribe(
      (response)=>{
        console.log(response)
        this.openTransactionModal(response);
      },
      (error) =>{
        console.log(error)
      }
    )
  }

  openTransactionModal(response:any){
    var options={
      key_id: response.orderId,
      key: response.key,
      currency: response.currency,
      amount: response.amount,
      name: 'Rohit',
      description: 'Payment for Train Booking',
      image: 'https://pixabay.com/link/?ua=cd3%3Dimage%26cd7%3Den%253Atrain%253AIND%26ec%3Dapi_ad%26ea%3Dnavigate%26el%3Dgetty%26tid%3DUA-20223345-1%26dr%3Dhttps%253A%252F%252Fpixabay.com%252Fimages%252Fsearch%252F&sp=%2524%3Dadvertisement_clicked%26action%3Dnavigate%26ad_partner%3Dgetty%26ad_content%3Dapi_ad%26ad_type%3D%26media_type%3Dimage%26media_id%3D&next=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fmass-rapid-transit-singapore-mrt-train-gm469496354-61608784%3Futm_source%3Dpixabay%26utm_medium%3Daffiliate%26utm_campaign%3DSRP_image_sponsored%26utm_content%3Dhttps%253A%252F%252Fpixabay.com%252Fimages%252Fsearch%252Ftrain%252F%26utm_term%3Dtrain&hash=65faee29f510c45d89d88a460bdf59d9d35bef33&=',
      handler: (response:any) =>{
          if(response != null && response.razorpay_payment_id!=null){
            this.bookTicket();
            this.router.navigate(["/"])
          } else{
            alert("Payment Failed")
          }
          
      },
      prefill:{
        name: 'Train Book',
        email: 'book@gmail.com',
        contact: '8521457895'
      },
      notes:{
        address: 'Train Booking'
      },
      theme:{
        color:'#F37254'
      }
    };

    var razorPayObject = new Razorpay(options)
    razorPayObject.open();
    
  }

  processResponse(resp:any){
    this.paymentService.test().subscribe(
      response =>{
        console.log(response)
      }
    )
    console.log(resp);
  }

}
