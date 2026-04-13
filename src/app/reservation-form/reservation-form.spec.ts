import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationForm } from './reservation-form';

describe('ReservationForm', () => {
  let component: ReservationForm;
  let fixture: ComponentFixture<ReservationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the expected controls', () => {
    expect(component.reservationForm.contains('guestName')).toBeTrue();
    expect(component.reservationForm.contains('guestEmail')).toBeTrue();
    expect(component.reservationForm.contains('roomNumber')).toBeTrue();
    expect(component.reservationForm.contains('checkInDate')).toBeTrue();
    expect(component.reservationForm.contains('checkOutDate')).toBeTrue();
  });

  it('should reject a checkout date that is not after checkin', () => {
    component.reservationForm.setValue({
      guestName: 'Test Guest',
      guestEmail: 'test@example.com',
      roomNumber: 101,
      checkInDate: '2026-05-01',
      checkOutDate: '2026-05-01',
    });

    expect(component.reservationForm.hasError('invalidDateRange')).toBeTrue();
  });
});
