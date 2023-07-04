import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import { SearchComponent } from './search/search.component';
import { AddTrainComponent } from './admin-components/add-train/add-train.component';
import { TrainsComponent } from './trains/trains.component';
import { TicketBookComponent } from './ticket-book/ticket-book.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { adminAuthGuard } from './admin-auth.guard';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,pathMatch:'full',canActivate:[authGuard]},
  {path:'searchtrain',component:SearchPageComponent,pathMatch:'full'},
  {path:'addtrain',component:AddTrainComponent,pathMatch:'full',canActivate:[adminAuthGuard]},
  {path:'getalltrains',component:TrainsComponent,pathMatch:'full'},
  {path:'bookticket',component:TicketBookComponent,pathMatch:'full',canActivate:[authGuard]},
  {path:"mybookings",component:BookingsComponent,pathMatch:'full',canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
