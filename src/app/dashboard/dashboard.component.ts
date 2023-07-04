import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { DataService } from '../services/data.service';
// import Razorpay from 'razorpay';


declare var Razorpay:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  formadata={
    amount:''
  }

  constructor(private dataService:DataService) {}
}
