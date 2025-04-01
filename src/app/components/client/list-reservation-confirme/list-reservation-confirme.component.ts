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
  elementSearchForm: any = {};   // Pour stocker les résultats de recherche
  currentPage: number = 1; // Page courante
  pageSize: number = 5; // Nombre d'éléments par page
  totalItems: number = 0; // Nombre total d'éléments


      ngOnInit(): void {
        this.getReservationConfirmer();
        }

        constructor(private reservationParkingService: ReservationParkingService) {}

        getReservationConfirmer(): void {
          this.reservationParkingService.getReservationConfirmer().subscribe(data => this.reservations =
          data);
          this.totalItems = this.reservations.length; // Met à jour le nombre total d'éléments
          this.paginate();
      }

      paginate(): void {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.reservations = this.reservations.slice(startIndex, endIndex);
      }

      // Fonction pour la page suivante
      changePage(page: number): void {
        this.currentPage = page;
        this.paginate();
      }

      getReservationConfirmerSearch(): void {
        console.log("de ato koooo atoooooo");
        if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
          alert("Veuillez entrer des dates valides !");
          return;
        }

        const dateDebutObj = new Date(this.elementSearchForm.date_debut);
        const dateFinObj = new Date(this.elementSearchForm.date_fin);

        const dateDebut = dateDebutObj.toISOString().split('T')[0];
        const dateFin = dateFinObj.toISOString().split('T')[0];

        this.reservationParkingService.getReservationConfirmerSearch(dateDebut, dateFin)
          .subscribe((data: any) => {
            if (Array.isArray(data.rendezVous)) {
              this.elementSearchForm = data.rendezVous;
            } else {
              this.elementSearchForm = [];
            }
          });
      }


}
