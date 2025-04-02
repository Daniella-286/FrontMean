import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InterventionService } from '../../../services/Interventions.service';


@Component({
  selector: 'app-list-interventions-terminer',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-interventions-terminer.component.html',
  styleUrl: './list-interventions-terminer.component.css'
})
export class ListInterventionsTerminerComponent {

    elementSearchForm = {
      date: '',
      }
      reservationSearch: any[] = [];
      interventions: any[] = [];

      currentPage: number = 1; // Page courante
      pageSize: number = 5; // Nombre d'éléments par page
      totalItems: number = 0; // Nombre total d'éléments
      totalPages: number = 0; // Initialisation

      errorMessage: string = '';  // Variable pour afficher un message d'erreur
      isSearchActive: boolean = false; // Pour savoir si la recherche est activée


      constructor(private interventionService: InterventionService) {}

      ngOnInit(): void {
        this.getInterventionTerminerDefault();
        }

        getInterventionTerminerDefault(): void {
          this.interventionService.getInterventionTerminerDefault().subscribe(data => {
            console.log("Réponse API :", data); // Vérifiez la structure de la réponse
            if (data && Array.isArray(data.data)) {
              this.interventions = data.data; // Utiliser data.data ici
              this.totalItems = data.total; // Mettre à jour le nombre total d'éléments
              this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Mise à jour du nombre total de pages
            } else {
              console.error("Les données renvoyées ne sont pas un tableau :", data);
              this.interventions = [];
              this.totalPages = 0;
            }
            this.paginate(); // Met à jour la pagination après avoir récupéré les données
          });
        }


        getInterventionTerminerSearch(): void {
          if (!this.elementSearchForm.date) {
            alert("Veuillez entrer une date valide !");
            return;
          }

          // Convertir la date au format 'YYYY-MM-DD' si l'API attend ce format
          const dateDebut = new Date(this.elementSearchForm.date).toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

          this.interventionService.getInterventionTerminerSearch(dateDebut).subscribe(
            (data: any) => {
              if (data && Array.isArray(data.data) && data.data.length > 0) {
                this.reservationSearch = data.data;
                this.errorMessage = ''; // Clear error message
                console.log('Résultats de la recherche:', this.reservationSearch);
              } else {
                this.reservationSearch = [];
                this.errorMessage = 'Aucune intervention terminée pour cette date.'; // Afficher message d'erreur
                console.error("Aucune intervention terminée pour cette date");
              }
              this.isSearchActive = true; // Indiquer que la recherche a été effectuée
            },
            (error) => {
              console.error("❌ Erreur lors de la récupération des données :", error);
              this.errorMessage = 'Une erreur est survenue lors de la recherche.';
            }
          );
        }




      paginate(): void {
        // Calcul des éléments à afficher sur la page courante
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.reservationSearch = this.interventions.slice(startIndex, endIndex);
      }

      changePage(page: number): void {
        this.currentPage = page;
        this.paginate();
      }

}

// getInterventionTerminerSearch(): void {
//   if (!this.elementSearchForm.date) {
//     alert("Veuillez entrer des dates valides !");
//     return;
//   }

//   const dateDebutObj = new Date(this.elementSearchForm.date);
//   const dateDebut = dateDebutObj.toISOString().split('T')[0];  // Formater la date en 'YYYY-MM-DD'

//   this.interventionService.getInterventionTerminerSearch(dateDebut).subscribe(
//     (response: any) => {
//       // Vérifiez que 'response.data' est bien un tableau
//       if (response && Array.isArray(response.data)) {
//         // Filtrer les résultats en fonction de la date d'intervention
//         this.reservationSearch = response.data.filter((intervention: any) => {
//           const dateIntervention = new Date(intervention.date_intervention).toISOString().split('T')[0]; // Formater la date d'intervention
//           return dateIntervention === dateDebut;  // Comparer les dates sans tenir compte de l'heure
//         });

//         console.log('Données de recherche', this.reservationSearch);
//       } else {
//         console.error("Les données renvoyées ne sont pas un tableau :", response);
//         this.reservationSearch = [];
//       }
//     },
//     (error) => {
//       console.error("❌ Erreur lors de la récupération des données :", error);
//       this.reservationSearch = [];
//     }
//   );
// }
