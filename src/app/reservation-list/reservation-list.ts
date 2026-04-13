import { Component, OnInit } from '@angular/core';
import { Reservation as ReservationService } from '../reservation/reservation';
import { Reservation as ReservationModel } from '../models/reservation';
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Home } from "../home/home";

@Component({
  selector: 'app-reservation-list',
  standalone : true,
  imports: [CommonModule, RouterLink, RouterModule, Home],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css',
})
export class ReservationList implements OnInit 
{
  reservations : ReservationModel[] = [];

  constructor(
    private reservationService : ReservationService,
    private router : Router
  )
  {
  }

  ngOnInit(): void {
      this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id:string){
    this.reservationService.deleteReservation(id);
  }


  back(){
     this.router.navigate(['/']);
  }
}
