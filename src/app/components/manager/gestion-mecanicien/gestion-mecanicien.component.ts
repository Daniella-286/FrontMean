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
      message: string = ""; // Stocke le message du backend
      errorMessage: string = ""
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
        this.mecanicienService.getRendezVousMecanicienDefault().subscribe((response: any) => {
          console.log("Réponse API reçue :", response);

          if (response && Array.isArray(response.data)) {
            this.mecaniciens = response.data; // Correctement assigner les mécaniciens
            console.log("Liste des mécaniciens :", this.mecaniciens);
          } else {
            console.error("Format de réponse inattendu :", response);
          }
        });
      }

      loadService(): void {
        this.serviceListService.getData().subscribe(data => {
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
              this.message = response.message;
              this.loadMecancienList();
              this.showPopup = false;
            },
            (error) => {
              this.message = error.message || "Erreur inconnue";
              console.error("Erreur:", this.message);
            }
          );
      }


}
