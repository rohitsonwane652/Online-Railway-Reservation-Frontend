import { Component,OnInit } from '@angular/core';
import { BookingDetail } from './bookingDetail.model';
import { DataService } from '../services/data.service';
import { PassengerDetail } from './passengerDetail.model';
import { TrainDetail } from '../search/traindetail.model';
import { LoginService } from '../services/login.service';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';

declare var Razorpay:any;

@Component({
  selector: 'app-ticket-book',
  templateUrl: './ticket-book.component.html',
  styleUrls: ['./ticket-book.component.css']
})
export class TicketBookComponent implements OnInit {

  bookingTrainDetail:BookingDetail

  constructor(private dataService:DataService,private loginService:LoginService,
            private paymentService:PaymentService,private router:Router) {

  }

  ngOnInit(){
    this.bookingTrainDetail =  this.dataService.getBookingTrainDetail();
  }

  passengerDetails:PassengerDetail[] = [];
  name:'';
  age:'';
  gender:'';

  isPassengerEmpty = true;
  addPassenger(){
    const userEmail = this.loginService.getLoginUser();
    const sourceStation = this.dataService.searchDetail.sourceStation;
    const destStation = this.dataService.searchDetail.destStation;

    const train:TrainDetail = this.bookingTrainDetail.train;

    this.passengerDetails.push(new PassengerDetail(this.name,this.age,this.gender,train.trainNo,
        userEmail,sourceStation,destStation,train.departureTime,train.arrivalTime));
    this.isPassengerEmpty = false;
    console.log(this.passengerDetails)
  }

  calculateTotalFare(){
    const train:TrainDetail = this.bookingTrainDetail.train;
    const totalFare = this.passengerDetails.length * train.fareAC;
    return totalFare;
  }

  bookTicket(){
    this.paymentService.bookAcTicket(this.passengerDetails[0]).subscribe(
      response =>{
        console.log(response);
      },
      error =>{
        console.log(error);
      }
    )
  }
  

  onSubmit(){
    const amount = this.calculateTotalFare();
    this.paymentService.createTransaction(amount).subscribe(
      (response)=>{
        console.log(response)
        this.openTransactionModal(response)
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
