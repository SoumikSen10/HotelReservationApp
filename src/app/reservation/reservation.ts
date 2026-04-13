import { Injectable } from '@angular/core';
import { Reservation as ReservationModel } from '../models/reservation';


@Injectable({
  providedIn: 'root',
})

export class Reservation {
  private reservations : ReservationModel[] = [];

  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    
    this.reservations = savedReservations? JSON.parse(savedReservations) : [];
  }

  // CRUD 

  getReservations() : ReservationModel[]{
    return this.reservations;
  }

  getReservation(id : string) : ReservationModel | undefined{
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation : ReservationModel) : void {

    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id : string) : void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index,1);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(id:string, updatedReservation : ReservationModel) : void {
    let index = this.reservations.findIndex(res => res.id ===id);

    if (index!== -1)
    {
      updatedReservation.id = id;
      this.reservations[index] = updatedReservation;
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

}
