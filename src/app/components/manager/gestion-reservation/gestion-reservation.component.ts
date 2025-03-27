import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationParkingService } from '../../../services/reservation-parking.service';

@Component({
  selector: 'app-gestion-reservation',
  imports: [CommonModule, FormsModule], // Ajout du module nécessaire
  templateUrl: './gestion-reservation.component.html',
  styleUrl: './gestion-reservation.component.css'
})
export class GestionReservationComponent {

    reservations: any[] = [];
    message: string = ""; // Stocke le message du backend
    errorMessage: string = ""
    elementSearchForm = {
      date_debut: '',
      date_fin: ''
    }
    reservationSearch: any[] = []; // Stocker les parkings disponibles après recherche

    ngOnInit(): void {
      this.loadReservationList();
      }

      constructor(private reservationParkingService: ReservationParkingService) {}

    loadReservationList(): void {
      this.reservationParkingService.getReservationConfirmer().subscribe(data => this.reservations =
      data);
    }

    getAllReservationSearch(): void {
      if (
        !this.elementSearchForm.date_debut ||
        !this.elementSearchForm.date_fin
        //  ||
        // isNaN(new Date(this.elementForm.date_debut).getTime()) ||
        // isNaN(new Date(this.elementForm.date_fin).getTime())
    ) {
        alert("Veuillez entrer des dates valides !");
        return;
    }

    console.log('Avant conversion - date debut:', this.elementSearchForm.date_debut);
    console.log('Avant conversion - date fin:', this.elementSearchForm.date_fin);

    // Convertir les dates en objet Date si elles sont en string
    const dateDebutObj = new Date(this.elementSearchForm.date_debut);
    const dateFinObj = new Date(this.elementSearchForm.date_fin);

    console.log('Après conversion - date debut:', dateDebutObj);
    console.log('Après conversion - date fin:', dateFinObj);

    const dateDebut = dateDebutObj.toISOString().split('T')[0];
    const dateFin = dateFinObj.toISOString().split('T')[0];

    console.log('Format final - ty date debut:', dateDebut);
    console.log('Format final - ty date fin:', dateFin);

    this.reservationParkingService.getAllReservationSearch(dateDebut, dateFin).subscribe(
      (data: any) => {
        this.reservationSearch = data;

        console.log("Parkings disponibles :", this.reservationSearch);
              // Vérifier si les résultats sont vides
      if (this.reservationSearch.length === 0) {
        this.errorMessage = "Aucune réservation en attente de validation dans cette période";
      } else {
        this.errorMessage = ''; // Réinitialiser le message d'erreur si des réservations sont trouvées
      }

      },
      (error) => {
        console.error(" Erreur lors de la récupération des parkings disponibles :", error);
        this.errorMessage = "Une erreur est survenue lors de la recherche des réservations.";
      }
    );
  }

  confirmReservationManager(id_reservation: string): void {
    console.log('ity ny id reservation ' , id_reservation);
    this.reservationParkingService.confirmReservationManager(id_reservation).subscribe(
      (response: any) => {
        this.message = response.message; // Stocker le message du backend
        this.loadReservationList(); // Rafraîchir la liste des réservations
        window.location.reload();
      },
      (_error) => {
        this.message = "Erreur lors de la confirmation.";
      }
    );
  }

}
