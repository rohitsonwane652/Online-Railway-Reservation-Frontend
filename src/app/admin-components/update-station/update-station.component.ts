import { Component } from '@angular/core';
import { TrainService } from 'src/app/services/train.service';
import { StationInfo } from './station-info.model';

@Component({
  selector: 'app-update-station',
  templateUrl: './update-station.component.html',
  styleUrls: ['./update-station.component.css']
})
export class UpdateStationComponent {

  constructor(private trainService:TrainService){}

  trainId:number;
  stationInfo:StationInfo[] = [];

  getAllStations(){
    this.trainService.getAllStationInfo(this.trainId).subscribe(
      (response:StationInfo[]) => {
        this.stationInfo = response;
      }
    )
  }

  updateStation(station){
    // console.log(station);
    this.trainService.updateStation(station).subscribe(
      response =>{
        console.log(response);
      }
    );
  }
}
