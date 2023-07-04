import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainDetail } from '../search/traindetail.model';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  url="http://localhost:8900/train";

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
    return this.http.get(`${this.url}/getallstations`)
  }
}
