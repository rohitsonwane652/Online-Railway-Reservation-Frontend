import { TestBed } from '@angular/core/testing';

import { TrainService } from './train.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [TrainService]
    });
  });

  it('Is Service running', () => {
    const service: TrainService = TestBed.get(TrainService);
    expect(service).toBeTruthy();
   });
});
