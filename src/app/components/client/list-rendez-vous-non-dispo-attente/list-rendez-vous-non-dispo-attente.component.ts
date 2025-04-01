import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RendezVousService } from '../../../services/rendez-vous.service';

@Component({
  selector: 'app-list-rendez-vous-non-dispo-attente',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-rendez-vous-non-dispo-attente.component.html',
  styleUrl: './list-rendez-vous-non-dispo-attente.component.css'
})
export class ListRendezVousNonDispoAttenteComponent {

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
          this.getRendezVousNonDispoAttenteDefault();
        }

        getRendezVousNonDispoAttenteDefault(): void {
          console.log("tonga atoooooo");
          this.rendezVousService.getRendezVousNonDispoAttenteDefault().subscribe((data: any) => {
            console.log("Données reçues de l'API :", data); // Ajoutez ceci
            if (data && Array.isArray(data.data)) {
              this.rendez_vous = data.data; // Correction ici
              console.log("Données stockées :", this.rendez_vous);
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
        getRendezVousNonDispoAttenteSearch(): void {
          console.log("de ato koooo atoooooo");
          if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
            alert("Veuillez entrer des dates valides !");
            return;
          }

          const dateDebutObj = new Date(this.elementSearchForm.date_debut);
          const dateFinObj = new Date(this.elementSearchForm.date_fin);

          const dateDebut = dateDebutObj.toISOString().split('T')[0];
          const dateFin = dateFinObj.toISOString().split('T')[0];

          this.rendezVousService.getRendezVousNonDispoAttenteSearch(dateDebut, dateFin)
            .subscribe((data: any) => {
              if (Array.isArray(data.rendezVous)) {
                this.rendezVousSearch = data.rendezVous;
              } else {
                this.rendezVousSearch = [];
              }
            });
        }

}
