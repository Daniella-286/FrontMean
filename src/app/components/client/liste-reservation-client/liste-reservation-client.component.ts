import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationParkingService } from '../../../services/reservation-parking.service';
@Component({
  selector: 'app-liste-reservation-client',
  templateUrl: './liste-reservation-client.component.html',
  imports: [CommonModule, FormsModule], // Ajout du module nécessaire
  styleUrls: ['./liste-reservation-client.component.css']
})
export class ListeReservationClientComponent implements OnInit {
  reservations: any[] = [];
  message: string = ""; // Stocke le message du backend
  reservationSearch: any[] = []; // Stocker les parkings disponibles après recherche

  elementSearchForm = {
    date_debut: '',
    date_fin: ''
  }

  currentPage: number = 1; // Page courante
  pageSize: number = 5; // Nombre d'éléments par page
  totalItems: number = 0; // Nombre total d'éléments



  constructor(private reservationParkingService: ReservationParkingService) {}

  ngOnInit(): void {
    this.loadReservationList();
  }

  getReservationSearch(): void {
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

  this.reservationParkingService.getReservationSearch(dateDebut, dateFin).subscribe(
    (data: any) => {
      this.reservationSearch = data;
      console.log("✅ Parkings disponibles :", this.reservationSearch);
    },
    (error) => {
      console.error("❌ Erreur lors de la récupération des parkings disponibles :", error);
    }
  );
}

  loadReservationList(): void {
    this.reservationParkingService.getReservationClient().subscribe(
      (data) => {
        this.reservations = data;
      },
      (_error) => {
        this.message = "Erreur lors du chargement des réservations.";
      }
    );
    this.totalItems = this.reservations.length; // Met à jour le nombre total d'éléments
    this.paginate(); // Applique la pagination
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.reservationSearch = this.reservationSearch.slice(startIndex, endIndex);
  }

  // Fonction pour la page suivante
  changePage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  confirmReservation(id_reservation: string): void {
    console.log('ity ny id reservation ' , id_reservation);
    this.reservationParkingService.confirmReservation(id_reservation).subscribe(
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

  cancelReservation(id_reservation: string): void {
    this.reservationParkingService.cancelReservation(id_reservation).subscribe(
      (response: any) => {
        this.message = response.message; // Stocker le message du backend
        this.loadReservationList(); // Rafraîchir la liste des réservations
      },
      (error) => {
        this.message = "Erreur lors de l'annulation.";
      }
    );
  }
}
