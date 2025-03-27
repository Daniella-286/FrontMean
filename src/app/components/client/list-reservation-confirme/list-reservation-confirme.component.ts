import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationParkingService } from '../../../services/reservation-parking.service';

@Component({
  selector: 'app-list-reservation-confirme',
  imports: [CommonModule, FormsModule], // Ajout du module nécessaire
  templateUrl: './list-reservation-confirme.component.html',
  styleUrl: './list-reservation-confirme.component.css'
})
export class ListReservationConfirmeComponent {
  reservations: any[] = [];

      ngOnInit(): void {
        this.loadParkingList();
        }

        constructor(private reservationParkingService: ReservationParkingService) {}

      loadParkingList(): void {
        this.reservationParkingService.getReservationConfirmer().subscribe(data => this.reservations =
        data);
      }


}
