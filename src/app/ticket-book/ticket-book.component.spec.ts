import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBookComponent } from './ticket-book.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TicketBookComponent', () => {
  let component: TicketBookComponent;
  let fixture: ComponentFixture<TicketBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketBookComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(TicketBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
