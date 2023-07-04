import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { SearchComponent } from './search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { AddTrainComponent } from './admin-components/add-train/add-train.component';
import { DatePipe } from '@angular/common';
import { TrainsComponent } from './trains/trains.component';
import { TicketBookComponent } from './ticket-book/ticket-book.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SearchPageComponent } from './search-page/search-page.component';
import { BookingsComponent } from './bookings/bookings.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SearchComponent,
    AddTrainComponent,
    TrainsComponent,
    TicketBookComponent,
    SearchPageComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
  providers: [{provide:{HTTP_INTERCEPTORS,MatDialogRef},useClass:AuthInterceptor,multi:true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
