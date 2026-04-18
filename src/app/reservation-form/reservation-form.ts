import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule} from "@angular/common";
import { Reservation as reservationModel} from '../models/reservation';
import {Reservation as reservationService} from '../reservation/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import {Home} from "../home/home";

@Component({
  selector: 'app-reservation-form',
  standalone : true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, Home],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm implements OnInit {

  reservationForm! : FormGroup; // initialization

  constructor(
    private formBuilder : FormBuilder,
    private reservationService : reservationService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ){

  }

  ngOnInit(): void {
      this.reservationForm = this.formBuilder.group({
        checkInDate : ['', Validators.required], //names should match formControl names
        checkOutDate : ['', Validators.required],
        guestName : ['', Validators.required],
        guestEmail : ['', [Validators.required, Validators.email]],
        roomNumber : ['', Validators.required],
      });

      let id = this.activatedRoute.snapshot.paramMap.get("id")

      if(id)
      {
          this.reservationService.getReservation(id).subscribe(data => {

            if(data)
              this.reservationForm.patchValue(data);
        });
      }
  }

  onSubmit() {
    if(this.reservationForm.valid)
    {
      let reservation : reservationModel = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get("id");

      if(id)
      {
        // update
        
        this.reservationService.updateReservation(id,reservation).subscribe(()=>{
          console.log("Update request processed");
        });
      }
      else
      {
        // new 
        //let newReservation : reservationModel = this.reservationForm.value;
        this.reservationService.addReservation(reservation).subscribe(()=>{
          console.log("Update request processed")
        });
        //console.log('Form submitted : ',newReservation);
      }
      this.router.navigate(['/list']);
    }
  }

}
