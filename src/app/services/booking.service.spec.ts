import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BookingService } from './booking.service';
import { Observable } from 'rxjs';

describe('BookingService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [BookingService]
    });
  });

  it('Is Service running', () => {
    const service: BookingService = TestBed.get(BookingService);
    expect(service).toBeTruthy();
   });

});
