import { Injectable } from '@angular/core';
import { TrainDetail } from '../search/traindetail.model';
import { BookingDetail } from '../ticket-book/bookingDetail.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sharedTrains:TrainDetail[];

  searchDetail={
    sourceStation:'',
    destStation:'',
    dateOfJourney:''
  }

  redirectUrl:String = ''

  bookingTrainDetail:BookingDetail
  

  constructor() {
    this.sharedTrains = [];
  }

   getTrains(){
    return this.sharedTrains
   }

   getSearchDetails(){
      return this.searchDetail;
   }

   getRedirectUrl(){
    return this.redirectUrl
   }

   setBookingTrainDetail(train:TrainDetail,seatType:String){
      this.bookingTrainDetail={
        train:train,
        seatType:seatType
      }
   }

   getBookingTrainDetail(){
      return this.bookingTrainDetail
   }

}
