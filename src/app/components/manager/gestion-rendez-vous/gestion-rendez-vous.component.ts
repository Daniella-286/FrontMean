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
  message: string = ""; // Stocke le message du backend
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
      }
    });
  }

  getAllRendezVousSearch(): void {
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
        if (Array.isArray(data.rendezVous)) {
          this.rendezVousSearch = data.rendezVous;
        } else {
          this.rendezVousSearch = [];
        }
      });
  }

  ValidationRendezVous(id_rdv: string): void {
    console.log('ity ny id rdv ', id_rdv);
    this.rendezVousService.confirmRendezVousManager(id_rdv).subscribe(
      (response: any) => {
        this.message = response.message;  // Message de succès
        this.loadDefaultRendezVous();  // Rafraîchir la liste des rendez-vous
        window.location.reload();
      },
      (error) => {
        this.message = error.message || "Erreur inconnue";  // Message d'erreur du backend
        console.error("Erreur:", this.message);  // Afficher l'erreur dans la console pour debug
      }
    );
  }

  NonDispoRendezVousManager(id_rdv: string): void {
    console.log('ity ny id rdv ', id_rdv);
    this.rendezVousService.NonDispoRendezVousManager(id_rdv).subscribe(
      (response: any) => {
        this.message = response.message;  // Message de succès
        this.loadDefaultRendezVous();  // Rafraîchir la liste des rendez-vous
        window.location.reload();
      },
      (error) => {
        this.message = error.message || "Erreur inconnue";  // Message d'erreur du backend
        console.error("Erreur:", this.message);  // Afficher l'erreur dans la console pour debug
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

