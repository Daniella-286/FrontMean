import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceListService } from '../../../services/service.service';
import { SousServiceService } from '../../../services/sous-service.service';

@Component({
  selector: 'app-gestion-sous-service',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-sous-service.component.html',
  styleUrl: './gestion-sous-service.component.css'
})
export class GestionSousServiceComponent {

     showPopup = false; // Pour l'ajout
          showUpdatePopup = false; // Pour l'update
          selectedSousServiceId: string | null = null;
          elementForm = { nom_sous_service: '' , id_service:'' , tarif:''
          };
          updateForm = { nom_sous_service: '' , id_service:'' , tarif:'' }; // Objet pour stocker les données du formulaire

          services: any[] = [];
          sous_services: any[] = [];

          constructor(private sousServiceService: SousServiceService ,  private serviceListService: ServiceListService) {}

          ngOnInit(): void {
            this.loadService();
            this.loadSousService();
          }

            loadService(): void {
              this.serviceListService.getData().subscribe(data => {
                this.services = data;
                console.log('service chargées retooo:', this.services); // Vérifier les catégories après chargement
               // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
              });
            }

            loadSousService(): void {
              this.sousServiceService.getData().subscribe(data => {
                this.sous_services = data;
                console.log('sous_services chargées retooo:', this.sous_services); // Vérifier les catégories après chargement
               // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
              });
            }

          // Ouvrir le popup d'ajout
          openAddPopup() {
            this.showPopup = true;
            this.showUpdatePopup = false;
            console.log("Popup d'ajout affiché");
          }

          openUpdatePopup(sous_service: any) {
            this.selectedSousServiceId = sous_service._id; // Stocker l'ID du modèle sélectionné
            //nom_sous_service: '' , id_service:'' , tarif:''
            this.updateForm = {
              nom_sous_service: sous_service.nom_sous_service,
              id_service: sous_service.id_service._id, // S'assurer que l'ID du marque est bien récupéré
              tarif:sous_service.tarif
            };
            console.log('ty mints le sous_service.id_marque' , sous_service.id_service);
            this.showUpdatePopup = true;
            this.showPopup = false;
            console.log("Popup de mise à jour affiché", this.updateForm);
          }

          // Fermer les popups
          closePopup() {
            this.showPopup = false;
            this.showUpdatePopup = false;
            this.selectedSousServiceId = null;
          }


               // Supprimer un parking
              deleteSousService(id: string): void {
                console.log('id_piece itooo' , id)
                  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                  this.sousServiceService.deleteSousServiceById(id , headers).subscribe(() =>
                this.loadSousService());
              }

            // Mettre à jour un piece
            updateSousService(): void {
              if (!this.selectedSousServiceId) return;
              //nom_sous_service: '' , id_service:'' , tarif:''
              const updatedModel = {
                nom_sous_service: this.updateForm.nom_sous_service,
                id_service:this.updateForm.id_service,
                tarif:this.updateForm.tarif
              };

              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

              this.sousServiceService.updateSousServiceById(this.selectedSousServiceId, updatedModel, headers).subscribe(
                () => {
                  this.loadSousService(); // Recharger la liste après modification
                  this.closePopup();
                },
                error => {
                  console.error("❌ Erreur lors de la mise à jour :", error);
                }
              );
            }

            AddSousService(): void {
              console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

              // Vérifier si tous les champs requis sont remplis
              if (!this.elementForm.nom_sous_service || !this.elementForm.id_service ||
                !this.elementForm.tarif
                  ) {
                console.warn("⚠️ Formulaire incomplet :", this.elementForm);
                return;
              }

              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

              this.sousServiceService.addSousService(this.elementForm, headers).subscribe(
                response => {
                  console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
                  console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

                  this.loadSousService(); // Recharge la liste après ajout
                  this.closePopup();
                  this.elementForm = { nom_sous_service: '', id_service: '' , tarif:""  }; // Réinitialise le formulaire
                },
                error => {
                  console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
                }
              );
            }

}
