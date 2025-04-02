import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MecanicienService } from '../../../services/mecanicien.service';
import { ServiceListService } from '../../../services/service.service';

@Component({
  selector: 'app-gestion-mecanicien',
  imports: [CommonModule, FormsModule], // Ajout du module nécessaire
  templateUrl: './gestion-mecanicien.component.html',
  styleUrl: './gestion-mecanicien.component.css'
})
export class GestionMecanicienComponent {
      mecaniciens: any[] = [];
      services: any[] = [];


      errorMessage: string = "";

      searchQuery: string = ""; // Requête de recherche
      currentPage: number = 1;
      totalPages: number = 1;
      pageSize: number = 10; // Nombre d'éléments par page

      showPopup = false; // Pour l'update
      updateForm = { id_service: ''};
      selectedMecanicienId: string | null = null;

      ngOnInit(): void {
        this.loadMecancienList();
        this.loadService();
      }

      constructor(private mecanicienService: MecanicienService , private serviceListService: ServiceListService ) {}

      loadMecancienList(): void {
        console.log("Début de loadMecancienList()");
        this.mecanicienService.getMecaniciensNonValides(this.currentPage, this.pageSize, this.searchQuery).subscribe((response: any) => {
          console.log("Réponse API reçue :", response);

          if (response.success) {
            if (Array.isArray(response.data) && response.data.length > 0) {
              this.mecaniciens = response.data;
              this.totalPages = response.totalPages;
              this.errorMessage = ""; // Réinitialiser le message d'erreur s'il y a des résultats
            } else {
              this.mecaniciens = []; // Vider la liste si aucun résultat trouvé
              this.errorMessage = response.message || "Aucun mécanicien trouvé."; // Utiliser le message de l'API
            }
          } else {
            console.error("Erreur API :", response.message);
            this.errorMessage = "Une erreur est survenue lors de la récupération des mécaniciens.";
          }
        }, (error) => {
          console.error("Erreur API :", error);
          this.errorMessage = "Impossible de récupérer les mécaniciens. Vérifiez votre connexion.";
        });
      }

        // Gérer la recherche
  onSearchChange(): void {
    this.currentPage = 1; // Réinitialiser la pagination en cas de nouvelle recherche
    this.loadMecancienList();
  }

  // Passer à la page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMecancienList();
    }
  }

  // Revenir à la page précédente
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMecancienList();
    }
  }

  loadService(): void {
    this.serviceListService.getListesService().subscribe(data => {
      this.services = data;
     // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
    });
  }

      openPopup(mecanicien: any) {
        if (!mecanicien || !mecanicien._id) {
          console.error("Erreur: ID du mécanicien non défini !");
          return;
        }

        this.selectedMecanicienId = mecanicien._id;
        this.updateForm.id_service = mecanicien.id_service || 'default';
        this.showPopup = true;
        console.log("Popup de mise à jour affiché avec l'ID:", this.selectedMecanicienId);
      }


      // Fermer les popups
      closePopup() {
        this.showPopup = false;
        this.selectedMecanicienId = null;
      }

      ValidationMecanicieByManager(): void {
        if (!this.selectedMecanicienId || !this.updateForm.id_service) {
          console.log("ID du mécanicien ou service manquant !");
          return;
        }

        console.log('ID mécanicien:', this.selectedMecanicienId);
        console.log('ID service:', this.updateForm.id_service);

        this.mecanicienService.validationMecanicieByManager(this.selectedMecanicienId, this.updateForm.id_service)
          .subscribe(
            (response: any) => {
              this.errorMessage = response.message;
              this.loadMecancienList();
              this.showPopup = false;
            },
            (error) => {
              this.errorMessage = error.message || "Erreur inconnue";
              console.error("Erreur:", this.errorMessage);
            }
          );
      }


}
