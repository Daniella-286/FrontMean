import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RendezVousService } from '../../../services/rendez-vous.service';


@Component({
  selector: 'app-list-rendez-vous-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-rendez-vous-client.component.html',
  styleUrl: './list-rendez-vous-client.component.css'
})
export class ListRendezVousClientComponent {
    rendezVousSearch: any[] = [];  // Pour stocker les résultats de recherche
    rendez_vous: any[] = [];        // Pour stocker les résultats par défaut
    elementSearchForm: any = {};    // Formulaire de recherche
    message: string = ""; // Stocke le message du backend
    success: boolean = true;
    currentPage: number = 1; // Page courante
    pageSize: number = 5; // Nombre d'éléments par page
    totalItems: number = 0; // Nombre total d'éléments



    selectedRendezVousId: string | null = null;
    showUpdatePopup = false; // Pour l'update
    updateForm = { date_rendez_vous: '', id_client: ''  , date_demande:'' };
  //implements OnInit
    constructor(private rendezVousService: RendezVousService) {}

    ngOnInit() {
      // Charger les rendez-vous par défaut
      this.getRendezVousClientDefault();
    }

    getRendezVousClientDefault(): void {
      this.rendezVousService.getRendezVousClientDefault().subscribe((data: any) => {
        if (data && Array.isArray(data.rendezVous)) {
          this.rendez_vous = data.rendezVous;
        }
      });
      this.totalItems = this.rendez_vous.length; // Met à jour le nombre total d'éléments
      this.paginate(); // Applique la pagination
    }

    paginate(): void {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.rendezVousSearch = this.rendez_vous.slice(startIndex, endIndex);
    }

    // Fonction pour la page suivante
    changePage(page: number): void {
      this.currentPage = page;
      this.paginate();
    }
    getAllRendezVousClientSearch(): void {
      if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
        alert("Veuillez entrer des dates valides !");
        return;
      }

      const dateDebutObj = new Date(this.elementSearchForm.date_debut);
      const dateFinObj = new Date(this.elementSearchForm.date_fin);

      const dateDebut = dateDebutObj.toISOString().split('T')[0];
      const dateFin = dateFinObj.toISOString().split('T')[0];

      this.rendezVousService.getAllRendezVousClientSearch(dateDebut, dateFin)
        .subscribe((data: any) => {
          if (Array.isArray(data.rendezVous)) {
            this.rendezVousSearch = data.rendezVous;
          } else {
            this.rendezVousSearch = [];
          }
        });
    }

    ConfirmRendezVous(id_rdv: string): void {
      console.log('ity ny id rdv ', id_rdv);
      this.rendezVousService.ConfirmRendezVousClient(id_rdv).subscribe(
        (response: any) => {
          this.message = response.message;  // Message de succès
          this.getRendezVousClientDefault();  // Rafraîchir la liste des rendez-vous
          window.location.reload();
        },
        (error) => {
          this.message = error.message || "Erreur inconnue";  // Message d'erreur du backend
          console.error("Erreur:", this.message);  // Afficher l'erreur dans la console pour debug
        }
      );
    }

    AnnulerRendezVousClient(id_rdv: string): void {
      console.log('ity ny id rdv ', id_rdv);
      this.rendezVousService.AnnulerRendezVousClient(id_rdv).subscribe(
        (response: any) => {
          this.message = response.message;  // Message de succès
          this.getRendezVousClientDefault();  // Rafraîchir la liste des rendez-vous
          window.location.reload();
        },
        (error) => {
          this.message = error.message || "Erreur inconnue";  // Message d'erreur du backend
          console.error("Erreur:", this.message);  // Afficher l'erreur dans la console pour debug
        }
      );
    }

    openUpdatePopup(rendez_vous: any) {
      this.selectedRendezVousId = rendez_vous._id;

      // Vérifier si la date existe et la formater correctement pour datetime-local
      if (rendez_vous.date_rendez_vous) {
        const date = new Date(rendez_vous.date_rendez_vous);
        this.updateForm.date_rendez_vous = date.toISOString().slice(0, 16); // Format YYYY-MM-DDTHH:MM
      } else {
        this.updateForm.date_rendez_vous = '';
      }

      this.updateForm.date_demande = rendez_vous.date_demande;

      this.showUpdatePopup = true;
      console.log("Popup de mise à jour affiché", rendez_vous);
    }

    // Fermer les popups
    closePopup() {
      this.showUpdatePopup = false;
      this.selectedRendezVousId = null;
    }
    UpdateRendezVousClient(): void {
      if (!this.selectedRendezVousId) return;

      const updatedPiece = {
        date_rendez_vous: new Date(this.updateForm.date_rendez_vous).toISOString()
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.rendezVousService.updateRendezVousClient(this.selectedRendezVousId, updatedPiece, headers).subscribe(
        (response: any) => {
          this.message = response.message;
          this.success = true; // Ajoute une variable pour différencier erreur et succès
          this.getRendezVousClientDefault();
          this.closePopup();
        },
        (error) => {
          this.message = error.message || "Erreur inconnue";
          this.success = false;
          console.error("Erreur:", this.message);
        }
      );
    }

}
