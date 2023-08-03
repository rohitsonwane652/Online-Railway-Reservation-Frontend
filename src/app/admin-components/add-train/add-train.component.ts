import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TrainService } from 'src/app/services/train.service';
import { TrainDetail } from './train-detail.model';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent  {
  
  constructor(private trainService:TrainService,private router:Router){
    this.trainService.getAllStations().subscribe(
      (response:any) =>{
        this.stationsToSelect = response;
      }
    )
  }

  
  myForm:FormGroup = new FormGroup({
    trainId:new FormControl(),
    trainName:new FormControl(),
    trainStart:new FormControl(),
    trainEnd:new FormControl(),
    capacityAC:new FormControl(),
    capacitySL:new FormControl(),
    fareAC:new FormControl(),
    fareSL:new FormControl(),
    stations:new FormControl()
  })
  // trainDetail:TrainDetail;

  
  stationsToSelect:String[] = [];
  
  stations = [];

  submitForm(){
    const trainDetail:TrainDetail = this.myForm.value;
    this.trainService.addTrain(this.myForm.value).subscribe(
      response =>{
        console.log(response);
      },
      error =>{
        console.log(error);
      }
    )
    Swal.fire('Success', 'Train added successfully!', 'success');
    this.router.navigate(['']);
  }

  trainId:number;
  date:String;

  addJourney(){
    this.trainService.addJourney(this.trainId,this.date).subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
