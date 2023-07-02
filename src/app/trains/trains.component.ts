import { Component,OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { TrainDetail } from '../search/traindetail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {
  
  
  stations:String[] = ['Mumbai','Nagpur']
  trainDetail1:TrainDetail = new TrainDetail(101,1129,"Duranto","Mumbai","Nagpur",60,60,300,500,0,0,this.stations,"20:00AM","20:00AM");
  trainDetail2:TrainDetail = new TrainDetail(102,1129,"Duranto","Mumbai","Nagpur",60,60,300,500,0,0,this.stations,"20:00AM","20:00AM");
  trainDetail3:TrainDetail = new TrainDetail(101,1129,"Duranto","Mumbai","Nagpur",60,60,300,500,0,0,this.stations,"20:00AM","20:00AM");
  trainDetail4:TrainDetail = new TrainDetail(101,1129,"Duranto","Mumbai","Nagpur",60,60,300,500,0,0,this.stations,"20:00AM","20:00AM");
  receivedTrains:TrainDetail[] = [this.trainDetail1,this.trainDetail2,this.trainDetail3,this.trainDetail4]
  
  searchDetail={
    sourceStation:'Mumbai',
    destStation:'Nagpur',
    dateOfJourney:'28-06-2023'
  }
  constructor(private dataService:DataService,private router:Router) { }
  
  ngOnInit(){
    // this.receivedTrains = this.dataService.getTrains()
    // this.searchDetail = this.dataService.getSearchDetails()
  }

  bookSlTicket(train:TrainDetail,seatType:string){
      this.dataService.setBookingTrainDetail(train,seatType)
      this.dataService.redirectUrl = 'bookticket'
      this.router.navigate(["bookticket"])
  }

  bookAcTicket(train:TrainDetail,seatType:string){
    
  }
}
