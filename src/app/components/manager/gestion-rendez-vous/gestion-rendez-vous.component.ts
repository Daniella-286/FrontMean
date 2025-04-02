import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RendezVousService } from '../../../services/rendez-vous.service';

@Component({
  selector: 'app-gestion-rendez-vous',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-rendez-vous.component.html',
  styleUrl: './gestion-rendez-vous.component.css'
})
export class GestionRendezVousComponent  {
  rendezVousSearch: any[] = [];  // Pour stocker les résultats de recherche
  rendez_vous: any[] = [];        // Pour stocker les résultats par défaut
  elementSearchForm: any = {};    // Formulaire de recherche

  errorMessage : string = ''; // Message du backend

  currentPage: number = 1; // Page courante
  pageSize: number = 5; // Nombre d'éléments par page
  totalItems: number = 0; // Nombre total d'éléments
  totalPages: number = 0; // Nombre total de pages


  //implements OnInit
  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit() {
    // Charger les rendez-vous par défaut
    this.loadDefaultRendezVous();
  }

  loadDefaultRendezVous(): void {
    this.rendezVousService.getRendezVousDefault().subscribe((data: any) => {
      if (data && Array.isArray(data.rendezVous)) {
        this.rendez_vous = data.rendezVous;
        this.totalItems = this.rendez_vous.length; // Met à jour le nombre total d'éléments
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Calcul du nombre total de pages
        this.paginate(); // Applique la pagination
      }
    });
  }
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.rendez_vous = this.rendez_vous.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Assurer que la page est dans les limites
    this.currentPage = page;
    this.paginate();
  }


  getAllRendezVousSearch(): void {
    console.log("tonga etoooo");

    if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
      alert("Veuillez entrer des dates valides !");
      return;
    }

    const dateDebutObj = new Date(this.elementSearchForm.date_debut);
    const dateFinObj = new Date(this.elementSearchForm.date_fin);

    const dateDebut = dateDebutObj.toISOString().split('T')[0];
    const dateFin = dateFinObj.toISOString().split('T')[0];

    this.rendezVousService.getAllRendezVousSearch(dateDebut, dateFin)
      .subscribe((data: any) => {
        if (Array.isArray(data.rendezVous) && data.rendezVous.length > 0) {
          this.rendezVousSearch = data.rendezVous;
          this.errorMessage = '';  // Réinitialiser l'erreur si des résultats sont trouvés
          console.log("reto ilay notadiavina ", this.rendezVousSearch);
        } else {
          this.rendezVousSearch = [];
          this.errorMessage = 'Aucune demande en attente trouvée pour cette période.';
          console.log("tsis ilay izy ");
        }
      }, (error) => {
        this.rendezVousSearch = [];
        this.errorMessage = 'Une erreur est survenue lors de la recherche des rendez-vous.';
        console.log("Erreur:", error);
      });
  }


  ValidationRendezVous(id_rdv: string): void {
    console.log('ity ny id rdv ', id_rdv);
    this.rendezVousService.confirmRendezVousManager(id_rdv).subscribe(
      (response: any) => {
        this.errorMessage = response.message;  // Message de succès
        this.loadDefaultRendezVous();  // Rafraîchir la liste des rendez-vous
        window.location.reload();
      },
      (error) => {
        this.errorMessage = error.message || "Erreur inconnue";  // Message d'erreur du backend
        console.error("Erreur:", this.errorMessage);  // Afficher l'erreur dans la console pour debug
      }
    );
  }

  NonDispoRendezVousManager(id_rdv: string): void {
    console.log('ity ny id rdv ', id_rdv);
    this.rendezVousService.NonDispoRendezVousManager(id_rdv).subscribe(
      (response: any) => {
        this.errorMessage = response.message;  // Message de succès
        this.loadDefaultRendezVous();  // Rafraîchir la liste des rendez-vous
        window.location.reload();
      },
      (error) => {
        this.errorMessage = error.message || "Erreur inconnue";  // Message d'erreur du backend
        console.error("Erreur:", this.errorMessage);  // Afficher l'erreur dans la console pour debug
      }
    );
  }


}

    // confirmReservationManager(id_rdv: string): void {
    //   console.log('ity ny id reservation ' , id_reservation);
    //   this.rendezVousService.confirmReservationManager(id_reservation).subscribe(
    //     (response: any) => {
    //       this.message = response.message; // Stocker le message du backend
    //       this.loadReservationList(); // Rafraîchir la liste des réservations
    //       window.location.reload();
    //     },
    //     (_error) => {
    //       this.message = "Erreur lors de la confirmation.";
    //     }
    //   );
    // }

