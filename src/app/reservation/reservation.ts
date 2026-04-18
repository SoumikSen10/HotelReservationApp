import { Injectable } from '@angular/core';
import { Reservation as ReservationModel } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Reservation {

  private apiUrl = "http://localhost:3000"
  private reservations : ReservationModel[] = [];

  // using constrcutor for local storage - As soon as your service/component is created, it automatically loads any saved reservations from localStorage.
  /* constructor(){
    let savedReservations = localStorage.getItem("reservations");
    
    this.reservations = savedReservations? JSON.parse(savedReservations) : [];
  } */

  // CRUD 

  //this constructor for dependency injection
  constructor(private http: HttpClient){}

  //An Observable is like a continuous async pipeline that can emit multiple values over time, unlike async/await which only waits for a single promise result.
  getReservations() : Observable<ReservationModel[]>{
    return this.http.get<ReservationModel[]>(this.apiUrl+"/reservations");
  }

  getReservation(id : string) : Observable<ReservationModel>{
    return this.http.get<ReservationModel>(this.apiUrl+"/reservation/"+id);
  }

  addReservation(reservation : ReservationModel) : Observable<void>{
  return this.http.post<void>(this.apiUrl+"/reservation", reservation);
  }

  deleteReservation(id : string) : Observable<void> {
    return this.http.delete<void>(this.apiUrl+"/reservation/"+id);
  }

  updateReservation(id:string, updatedReservation : ReservationModel) : Observable<void> {
    return this.http.put<void>(this.apiUrl+"/reservation/"+id,updatedReservation );
  }

}
