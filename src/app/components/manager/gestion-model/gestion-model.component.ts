import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarqueService } from '../../../services/marque.service';
import { ModelService } from '../../../services/model.service';

@Component({
  selector: 'app-gestion-model',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-model.component.html',
  styleUrl: './gestion-model.component.css'
})
export class GestionModelComponent {

   showPopup = false; // Pour l'ajout
        showUpdatePopup = false; // Pour l'update
        selectedModelId: string | null = null;
        elementForm = { nom_modele: '' , marque:''
        };
        updateForm = { nom_modele: '' , id_marque:'' }; // Objet pour stocker les données du formulaire

        marques: any[] = [];
        models: any[] = [];
         constructor(private modelService: ModelService  , private marqueService: MarqueService ) {}

        ngOnInit(): void {
          this.loadMarque();
          this.loadmodelList();
          }


    loadMarque(): void {
      this.marqueService.getData().subscribe(data => {
        this.marques = data;
// Vérifier les catégories après chargement
        //this.loadCompetence();  // Appeler loadArticles après que les catégories aient été chargées
      });
    }

    loadmodelList(): void {
      this.modelService.getData().subscribe(data => this.models =
      data);
      console.log('models chargées:', this.models);
    }
        // Ouvrir le popup d'ajout
        openAddPopup() {
          this.showPopup = true;
          this.showUpdatePopup = false;
          console.log("Popup d'ajout affiché");
        }

        openUpdatePopup(model: any) {
          this.selectedModelId = model._id; // Stocker l'ID du modèle sélectionné
          this.updateForm = {
            nom_modele: model.nom_modele,
            id_marque: model.marque._id // S'assurer que l'ID du marque est bien récupéré
          };
          console.log('ty mints le model.id_marque' , model.marque);
          this.showUpdatePopup = true;
          this.showPopup = false;
          console.log("Popup de mise à jour affiché", this.updateForm);
        }

        // Fermer les popups
        closePopup() {
          this.showPopup = false;
          this.showUpdatePopup = false;
          this.selectedModelId = null;
        }


        AddModel(): void {
          console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée
          console.log("📤 Données envoyées au serveur reoo ooh:", JSON.stringify(this.elementForm));

          // Vérifier si tous les champs requis sont remplis
          if (!this.elementForm.nom_modele || !this.elementForm.marque
              ) {
            console.warn("⚠️ Formulaire incomplet :", this.elementForm);
            return;
          }

          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

          this.modelService.addModelService(this.elementForm, headers).subscribe(
            response => {
              console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
              console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

              // this.loadInscriptionClient(); // Recharge la liste après ajout
              this.elementForm = { nom_modele: '' , marque:''}; // Réinitialise le formulaire
            },
            error => {
              console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
            }
          );
        }



             // Supprimer un parking
            deletemodel(id: string): void {
              console.log('id_piece itooo' , id)
                const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                this.modelService.deleteMModeleById(id , headers).subscribe(() =>
              this.loadmodelList());
            }

          // Mettre à jour un piece
          updatemodel(): void {
            if (!this.selectedModelId) return;

            const updatedModel = {
                nom_model: this.updateForm.nom_modele,
                id_marque:this.updateForm.id_marque
            };

            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

            this.modelService.updateModelegById(this.selectedModelId, updatedModel, headers).subscribe(
              () => {
                this.loadmodelList(); // Recharger la liste après modification
                this.closePopup();
              },
              error => {
                console.error("❌ Erreur lors de la mise à jour :", error);
              }
            );
          }


}
