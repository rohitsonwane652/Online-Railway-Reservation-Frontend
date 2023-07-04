import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TrainService } from '../services/train.service';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { startWith,Observable, flatMap  } from 'rxjs';
import { map } from 'rxjs';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { TrainDetail } from './traindetail.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private trainService:TrainService,private dataService:DataService,private router:Router){
    this.filteredSourceOptions = this.sourceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredDestOptions = this.destControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit(){
    this.getAllStations();
  }

  getAllStations(){
    this.trainService.getAllStations().subscribe(
      repsonse =>{
        this.sourceOptions = repsonse
      },
      error =>{
        console.log(error)
      }
    )
  }

  //Date Picker
  dateControl = new FormControl();
  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  //Search Source And Destination
  sourceControl = new FormControl();
  sourceOptions: any = [];
  filteredSourceOptions: Observable<string[]>;

  destControl = new FormControl();
  filteredDestOptions: Observable<string[]>;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sourceOptions.filter(option => option.toLowerCase().includes(filterValue));
  }  


  //Get All Trains for Given Input
  sourceStation=''
  destStation=''
  dateOfJourney=''

  trainDetails:TrainDetail[];
  responseString:String;

  getTrains(){
    this.trainService.searchTrain(this.sourceStation,this.destStation,this.dateOfJourney).subscribe(
      (response:TrainDetail[]) =>{
        if(response!=null && response.length!=0){
  
            this.trainDetails = response
            this.dataService.sharedTrains = this.trainDetails
            this.dataService.searchDetail = {sourceStation:this.sourceStation,destStation:this.destStation,dateOfJourney:this.dateOfJourney}
            this.router.navigate(['getalltrains'])  
          
        }else{
          this.responseString = "No Trains Available "
        }
      },
      error =>{
        console.log(error)
      }
    )
  }

}

  
