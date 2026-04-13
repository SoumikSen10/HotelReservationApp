import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  standalone : true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm {
  reservationForm : FormGroup = new FormGroup({});

}
