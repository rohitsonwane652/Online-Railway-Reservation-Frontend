import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainDetail } from '../search/traindetail.model';
import { StationInfo } from '../admin-components/update-station/station-info.model';
import { API_ENDPOINT } from '../api-contants';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  url=`${API_ENDPOINT}/train`;

  constructor(private http:HttpClient) { }

  newDate = new Date()
  searchDate = ''
  searchTrain(source:string,dest:string,date:any):Observable<TrainDetail[]>{
    this.newDate = date
    this.searchDate = `${this.newDate.getMonth()+1}/${this.newDate.getDate()}/${this.newDate.getFullYear()}`
    date = this.searchDate
    return this.http.get<TrainDetail[]>(`${this.url}/search`,{params: {source,dest,date}});
  }


  getAllStations(){
    return this.http.get<String>(`${this.url}/getallstations`);
  }

  addTrain(trainDetail:TrainDetail){
    return this.http.post(`${this.url}/addtrain`,trainDetail);
  }

  getAllStationInfo(trainId:number){
    return this.http.get(`${this.url}/getstationinfo`,{params: {trainId} });
  }

  updateStation(station:StationInfo){
    return this.http.put(`${this.url}/updatestation`,station)
  }

  addJourney(trainId:number,date:any){
    return this.http.post(`${this.url}/addtrainjourney`,{params:{trainId,date}})
  }
}
