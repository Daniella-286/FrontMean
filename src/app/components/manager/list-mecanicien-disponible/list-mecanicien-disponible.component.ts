import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InterventionService } from '../../../services/Interventions.service';
import { ServiceListService } from '../../../services/service.service';

@Component({
  selector: 'app-list-mecanicien-disponible',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-mecanicien-disponible.component.html',
  styleUrl: './list-mecanicien-disponible.component.css'
})

export class ListMecanicienDisponibleComponent {

        mecanicienSearch: any[] = [];  // Pour stocker les résultats de recherche
        mecaniciens: any[] = [];
        services: any[] = [];        // Pour stocker les résultats par défaut
        elementSearchForm: any = {};    // Formulaire de recherche
        message: string = ""; // Stocke le message du backend
        success: boolean = true;
         errorMessage: string = "";
         serverMessage: { text: string, class: string } = { text: '', class: '' };

         currentPage: number = 1;
         totalPages: number = 1;
         pageSize: number = 10;

        selectedRendezVousId: string | null = null;
        showUpdatePopup = false; // Pour l'update
        updateForm = { date_rendez_vous: '', id_client: ''  , date_demande:'' };
      //implements OnInit
        constructor(private interventionService: InterventionService , private serviceListService: ServiceListService ) {}

        ngOnInit() {
          // Charger les rendez-vous par défaut
          this.loadService();
        }

        loadService(): void {
          this.serviceListService.getListesService().subscribe(data => {
            this.services = data;
           // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
          });
        }

        getListMecanicienDisponibleSearch(date_intervention: string, duree_reparation: string, id_service: string): void {
          console.log("Recherche Params:", date_intervention, duree_reparation, id_service);

          // Vérification des paramètres avant d'envoyer la requête
          if (!date_intervention || !duree_reparation || !id_service) {
              console.log("Tous les paramètres doivent être fournis.");
              this.errorMessage = "Tous les paramètres doivent être fournis.";
              return;
          }

          // Validation de la durée de réparation
          if (parseFloat(duree_reparation) <= 0) {
              console.log("La durée doit être un nombre positif.");
              this.errorMessage = "La durée doit être un nombre positif.";
              return;
          }

          // Si la validation passe, on appelle le backend
          this.interventionService.getListMecanicienDisponibleSearch(date_intervention, duree_reparation, id_service)
              .subscribe(
                  (data: any) => {
                      console.log("Réponse reçue:", data);

                      // Si l'appel est réussi et que les mécaniciens sont renvoyés
                      if (data.success && Array.isArray(data.mecaniciens)) {
                          this.mecanicienSearch = data.mecaniciens;
                          this.totalPages = data.totalPages;  // Met à jour le total de pages
                          this.errorMessage = ""; // Réinitialiser le message d'erreur

                      } else {
                          // Si la réponse n'est pas ce à quoi on s'attend, on vide la recherche
                          this.mecanicienSearch = [];
                          // Afficher le message d'erreur du backend si nécessaire
                          this.errorMessage = data.message || "Aucun mécanicien disponible.";
                      }
                  },
                  (error) => {
                      console.error("Erreur lors de la recherche des mécaniciens:", error);
                      this.mecanicienSearch = [];

                      // Vérifier si le backend renvoie un message d'erreur spécifique
                      if (error.error && error.error.message) {
                          this.errorMessage = error.error.message;  // Afficher le message d'erreur du backend
                      } else {
                          this.errorMessage = "Une erreur est survenue lors de la recherche.";  // Message générique d'erreur
                      }
                  }
              );
      }

      changePage(page: number): void {
        if (page > 0 && page <= this.totalPages) {
          this.currentPage = page;
          this.getListMecanicienDisponibleSearch(this.elementSearchForm.date_intervention, this.elementSearchForm.duree_reparation, this.elementSearchForm.id_service);
        }
      }



}
